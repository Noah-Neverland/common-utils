import { cloneDeep } from 'lodash-es';
import CryptoJS from 'crypto-js';
import { isObject } from './is.js';

export * as is from './is.js';
export * as color from './color.js';

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  const res: any = cloneDeep(src);
  for (key in target) {
    res[key] = isObject(res[key]) ? deepMerge(res[key], target[key]) : (res[key] = target[key]);
  }
  return res;
}

export function openWindow(
  url: string,
  opt?: { target?: '_self' | '_blank' | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

/**
 * @name: 拼接请求参数
 * @param {any} info
 * @return {*}
 */
export const exportWithParams = (info: any) => {
  let params = '';
  const keys = Object.keys(info);
  for (let i = 0; i < keys.length; i++) {
    if (i === 0) {
      params += `${keys[i]}=${info[keys[i]]}`;
    } else {
      params += `&${keys[i]}=${info[keys[i]]}`;
    }
  }
  return params;
};

/**
 * @name: 拼接请求参数
 * @param {any} info
 * @return {*}
 */
export const exportWithParams0 = (info: any) => {
  let params = '';
  const keys = Object.keys(info);
  params += `&${keys[0]}=${info[keys[0]]}`;
  return params;
};

/**
 * tree数组扁平化
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns
 */
export const extractTree = (arrs: Array<any> = [], childs = 'children', attrArr?: any) => {
  let attrList: any = [];
  if (!Array.isArray(arrs)) return [];
  if (typeof childs !== 'string') return [];
  if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
    attrList = Object.keys(arrs[0]);
    if (attrList.indexOf(childs) > -1) attrList.splice(attrList.indexOf(childs), 1);
  } else {
    attrList = attrArr;
  }
  const list: any = [];
  const getObj = (arr: Array<any>) => {
    arr.forEach(function (row) {
      const obj: any = {};
      attrList.forEach((item: any) => {
        obj[item] = row[item];
      });
      list.push(obj);
      if (row[childs]) {
        getObj(row[childs]);
      }
    });
    return list;
  };
  return getObj(arrs);
};

/**
 * @name: inputNumber parser（数字输入框限制输入不为空、最大值、最小值）
 * @param {any} value
 * @param {number} max
 * @param {number} min
 * @return {*}
 */
export const inputNumberParser = (value: any, max: number, min: number) => {
  if (value.length < 1) {
    return min;
  }
  const v = parseFloat(value);
  if (!isNaN(v)) {
    if (v > max) {
      return max;
    } else if (v < min) {
      return min;
    } else {
      return v;
    }
  } else {
    return min;
  }
};

/**
 * @name: 返回一个对象里面包含后一个数组比第一个数组增加、减少的数据（适用于去重过后的数组）
 * @param {Array} beforeArr 前一个数组
 * @param {Array} afterArr 后一个数组
 * @return {*}
 */
export const ArrayCompare = (beforeArr: Array<any> = [], afterArr: Array<any> = []) => {
  const resObj = {
    add: <any>[],
    del: <any>[],
  };
  const cenObj: any = {};
  // 数组去重
  const tBeforeArr = [...new Set(beforeArr)];
  const tAftereArr = [...new Set(afterArr)];
  // 把beforeArr数组去重放入cenObj
  tBeforeArr.forEach((item: any) => {
    cenObj[item] = item;
  });
  // 遍历afterArr数组，查看元素是否在cenObj中
  tAftereArr.forEach((item: any) => {
    if (!cenObj[item]) {
      resObj.add.push(item);
    } else {
      delete cenObj[item];
    }
  });
  for (const k in cenObj) {
    resObj.del.push(k);
  }
  return resObj;
};

/**
 * @name: 判断是否是JSON字符串
 * @param {any} str
 * @return {*}
 */
export const isJSONStr = (str: any) => {
  try {
    if (JSON.parse(str) instanceof Object) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

/* @name: Intl.NumberFormat数字格式化应用
 * @param {number} num
 * @return {*}
 */
export const IntlFormatter = (num: number): string => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    currencySign: 'accounting',
  });

  return formatter.format(num);
};

/**
 * @name: 根据身份证信息获取用户信息
 * @param {any} IdCard 身份号
 * @param {number} type 获取类型
 * @return {*}
 */
export const IdCard = (IdCard: any, type: number): any => {
  switch (type) {
    case 2: // 获取性别
      return parseInt(IdCard.substr(16, 1)) % 2 === 1 ? '男' : '女';
    case 3: // 获取年龄
      const ageDate = new Date();
      const month = ageDate.getMonth() + 1;
      const day = ageDate.getDate();
      let age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1;
      if (
        IdCard.substring(10, 12) < month ||
        (IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day)
      ) {
        age++;
      }
      if (age <= 0) {
        age = 1;
      }
      return age;
    default: // 默认获取出生日期
      const birthday =
        IdCard.substring(6, 10) + '-' + IdCard.substring(10, 12) + '-' + IdCard.substring(12, 14);
      return birthday;
  }
};
/**
 * @name: 日期格式化
 * @param {Date} objDate 'new Date()'
 * @param {string} fmt 'yyyy-MM-dd HH:mm:ss'(传入的格式)
 * @return {*}
 */
export const formatDate = (objDate: Date, fmt: string) => {
  const o: any = {
    'M+': objDate.getMonth() + 1, // 月份
    'd+': objDate.getDate(), // 日
    'h+': objDate.getHours() % 12 === 0 ? 12 : objDate.getHours() % 12, // 小时
    'H+': objDate.getHours(), // 小时
    'm+': objDate.getMinutes(), // 分
    's+': objDate.getSeconds(), // 秒
    'q+': Math.floor((objDate.getMonth() + 3) / 3), // 季度
    S: objDate.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${objDate.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  });
  return fmt;
};

// AES加密
export function encryptAES(str: string) {
  const _key = '5F6B2AK33DZE20A05E74C231HEALTHNJ';
  const __key = CryptoJS.enc.Utf8.parse(_key);
  // const iv = CryptoJS.enc.Utf8.parse(_key.substr(0, 16))
  //加密
  const encrypt = CryptoJS.AES.encrypt(str, __key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypt.toString();
}

// AES解密
export function decryptAES(str: string) {
  const _key = '5F6B2AK33DZE20A05E74C231HEALTHNJ';
  const decrypted = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(_key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Inputnumber 输入正整数
export const limitDecimals = (value: string | number): string => {
  const reg = /^(\-)*(\d+).*$/;
  if (typeof value === 'string') {
    return !isNaN(Number(value)) ? value.replace(reg, '$1$2') : '';
  } else if (typeof value === 'number') {
    return !isNaN(value) ? String(value).replace(reg, '$1$2') : '';
  } else {
    return '';
  }
};

/**
 * @name: 获取地址栏参数
 * @param {string} name 需要获取的参数
 * @return {*}
 */
export const getQueryString = (url: string, name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = url.substr(url.indexOf('?') + 1).match(reg);
  if (r != null) return unescape(decodeURI(r[2]));
  return null;
};

/**
 * @name: 计算加
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const calcAdd = (a: number | string, b: number | string) => {
  var c, d, e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (calcMul(a, e) + calcMul(b, e)) / e;
};

/**
 * @name: 计算减
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const calcSub = (a: number | string, b: number | string) => {
  var c, d, e;
  try {
    c = a.toString().split('.')[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split('.')[1].length;
  } catch (f) {
    d = 0;
  }
  return (e = Math.pow(10, Math.max(c, d))), (calcMul(a, e) - calcMul(b, e)) / e;
};

/**
 * @name: 计算乘
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const calcMul = (a: number | string, b: number | string) => {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split('.')[1].length;
  } catch (f) { }
  try {
    c += e.split('.')[1].length;
  } catch (f) { }
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
};

/**
 * @name: 计算除
 * @param {*} a
 * @param {*} b
 * @return {*}
 */
export const calcDiv = (a: number | string, b: number | string) => {
  var c,
    d,
    e = 0,
    f = 0;
  try {
    e = a.toString().split('.')[1].length;
  } catch (g) { }
  try {
    f = b.toString().split('.')[1].length;
  } catch (g) { }
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    calcMul(c / d, Math.pow(10, f - e))
  );
};
