/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

// 最近时间周期
export const dateTimes = {
  // 本周
  currentWeeek: {
    start_time: dayjs().startOf('week').add(1, 'day'),
    end_time: dayjs().endOf('week').add(1, 'day'),
  },
  // 本月
  currentMonth: {
    start_time: dayjs().startOf('month'),
    end_time: dayjs().endOf('month'),
  },
  // 最近一周
  lastWeek: {
    start_time: dayjs().add(-6, 'day').startOf('day'),
    end_time: dayjs(),
  },
  // 最近一月
  lastMonth: {
    start_time: dayjs().add(-29, 'day').startOf('day'),
    end_time: dayjs(),
  },
  // 最近三月
  lastThreeMonth: {
    start_time: dayjs().add(-89, 'day').startOf('day'),
    end_time: dayjs(),
  },
  oneYear: {
    start_time: dayjs().add(-356, 'day').startOf('day'),
    end_time: dayjs(),
  },
};

export const getAllDate = (start: any, end: any) => {
  const dateArr: any = [];
  const startArr = start.split('-');
  const endArr = end.split('-');
  const db = new Date();
  db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
  const de = new Date();
  de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
  const unixDb = db.getTime();
  const unixDe = de.getTime();
  let stamp: number;
  const oneDay = 24 * 60 * 60 * 1000;
  for (stamp = unixDb; stamp <= unixDe;) {
    dateArr.push(format(new Date(stamp)));
    stamp = stamp + oneDay;
  }
  return dateArr;
};

export const format = (time: any) => {
  let ymd = '';
  const mouth = time.getMonth() + 1 >= 10 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
  const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
  ymd += time.getFullYear() + '-'; // 获取年份。
  ymd += mouth + '-'; // 获取月份。
  ymd += day; // 获取日。
  return ymd; // 返回日期。
};

// 月份

export const getAllMonth = () => {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    arr.push(`${dayjs().format('YYYY')}-${dayjs().month(i).format('MM')}`);
  }
  return arr;
};

export const forDateMat = format;
export const dateUtil = dayjs;
