import moment from 'moment';

function expiredKey(key: string) {
  return `@expired/${key}`;
}

export function getCache(key: string) {
  const expiredAt = localStorage.getItem(expiredKey(key));
  if (expiredAt && +expiredAt) {
    if (!moment().isAfter(+expiredAt)) {
      return localStorage.getItem(key);
    }
  }
  localStorage.removeItem(expiredKey(key));
  localStorage.removeItem(key);
  return undefined;
}

export function setCache(key: string, value: string, milliseconds: number) {
  localStorage.setItem(
    expiredKey(key),
    moment()
      .add(milliseconds, 'milliseconds')
      .valueOf()
      .toString(),
  );
}
