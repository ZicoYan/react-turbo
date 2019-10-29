import { getCache } from './cached-storage';
import { notification } from 'antd';

const HTTP_STATUS_MAP = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

type IRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IStandardServerResponse<T> {
  statusCode: number;
  errorCode: number;
  message: string;
  data: T;
}

function requestErrorNotify({
  code,
  message,
  isNetworkError,
}: {
  code: number;
  message: string;
  isNetworkError: boolean;
}) {
  notification.error({
    message: isNetworkError ? `网络错误：${code}` : `服务器错误：${code}`,
    description: message,
  });
}

function request<T>(method: IRequestMethod, url: string, data): Promise<T> {
  // 构造headers
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const authorization = getCache('Authorization');
  if (authorization) {
    headers.append('Authorization', authorization);
  }

  return (
    fetch(url, {
      method,
      headers,
      mode: 'cors',
      credentials: 'same-origin',
      referrer: 'no-referrer',
      redirect: 'follow',
      body: JSON.stringify(data),
    })
      // 处理fetch的raw response
      .then(fetchResponse => {
        if (fetchResponse.ok) {
          return fetchResponse.json();
        } else {
          requestErrorNotify({
            code: fetchResponse.status,
            message: HTTP_STATUS_MAP[+fetchResponse.status],
            isNetworkError: true,
          });
        }
      })
      // 处理请求网络错误
      .catch(error => {
        requestErrorNotify({
          code: 999,
          message: '网络错误',
          isNetworkError: true,
        });
      })
      // 处理服务端返回的response
      .then((serverResponse: IStandardServerResponse<T>) => {
        if (serverResponse.errorCode === 0) {
          return serverResponse.data;
        } else {
          return Promise.reject({
            code: serverResponse.errorCode,
            message: serverResponse.message,
            isNetworkError: false,
          });
        }
      })
  );
}

export default {
  post<T>(url: string, data: T) {
    return request<T>('POST', url, data);
  },
  get<T>(url: string, data: T) {
    return request<T>('GET', url, data);
  },
  put<T>(url: string, data: T) {
    return request<T>('PUT', url, data);
  },
  delete<T>(url: string, data: T) {
    return request<T>('DELETE', url, data);
  }
};
