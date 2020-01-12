import dayjs from 'dayjs';

function expiredKey(key: string) {
  return `@expired/${key}`;
}

export function getCache(key: string) {
  const expiredAt = localStorage.getItem(expiredKey(key));
  if (expiredAt && +expiredAt) {
    if (!dayjs().isAfter(+expiredAt)) {
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
    dayjs()
      .add(milliseconds, 'ms')
      .valueOf()
      .toString(),
  );
}
