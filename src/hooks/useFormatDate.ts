import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string) => {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * now) {
    const distanceString = formatDistanceToNow(d, { addSuffix: true, locale: ko, includeSeconds: true });
    return distanceString.replace(/^약\s*/, ''); // "약" 부분을 정규식을 사용하여 제거
  }
  return format(d, 'PPP EEE p', { locale: ko });
};
