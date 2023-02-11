import {
  EMAIL_REGEX,
  MOBILE_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from '../config/constant';

import AsyncStorage from '@react-native-async-storage/async-storage';
import IconByRouteName from './IconByRouteName';
import {UserLoginReturnType} from '../types';

export const stringShortener = (str: string, length: number) => {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  }
  return str;
};

export {IconByRouteName};

/**
 * @author: @vidhanshu
 * @abstract Checks for valid email address
 * @param email
 * @returns  {boolean}
 */
export const checkForValidEmail = (email: string): boolean =>
  EMAIL_REGEX.test(email);

/**
 * @author: @vidhanshu
 * @abstract Checks for valid password
 * @param password
 * @returns {boolean}
 */
export const checkForValidPassword = (password: string): boolean =>
  PASSWORD_REGEX.test(password);

/**
 * @author: @vidhanshu
 * @abstract Checks for valid username
 * @param username
 * @returns {boolean}
 */
export const checkForValidUsername = (username: string): boolean =>
  USERNAME_REGEX.test(username);
/**
 * @author: @vidhanshu
 * @abstract Checks for valid username
 * @param mobile
 * @returns {boolean}
 */
export const checkForValidMobile = (mobile: string): boolean =>
  MOBILE_REGEX.test(mobile);

/**
 * @description to convert the count to short form
 */
export const countShortForm = (count: number) => {
  if (count < 1000) {
    return count;
  }
  if (count < 1000000) {
    return `${Math.floor(count / 1000)}K`;
  }
  return `${Math.floor(count / 1000000)}M`;
};
/**
 *
 * @returns {Promise<UserLoginReturnType>}
 */
export const checkForUserLogin = async (): Promise<UserLoginReturnType> => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return {
      isLoggedIn: true,
      user: JSON.parse(user).data,
      token: JSON.parse(user).token,
    };
  }
  return {
    isLoggedIn: false,
    user: null,
    token: null,
  };
};

/**
 * @author: @vidhanshu
 * @abstract returns response object to handler
 * @param {boolean} error
 * @param {string} code
 * @param {any} data
 * @returns {object}
 */
export const sendResponse = (error: boolean, code: string, data: any) => ({
  error,
  code,
  data,
});

//formatted date
export const getForamttedDate = (date: string) => {
  let new_date = new Date(date);
  return `${new_date.getDate()}${getsuffix(new_date)}, ${getMonthAbbr(
    new_date.getMonth(),
  )} ${new_date.getFullYear() % 100}`;
};

//formatted time
export const getFormattedTime = (date: string) => {
  let new_date = new Date(date);
  let hr = new_date.getHours();
  let min: any = new_date.getMinutes();
  let suffix = new_date.toLocaleString().split(' ')[2];
  if (min < 10) {
    min = `0${min}`;
  }
  if (hr > 12) {
    hr = hr - 12;
  }
  return `${hr}:${min} ${suffix}`;
};

// returns appropriate suffix for date
const getsuffix = (date: Date) => {
  let new_date = new Date(date);
  let suffix = 'th';
  switch (new_date.getDate()) {
    case 1:
    case 21:
    case 31:
      suffix = 'st';
      break;
    case 2:
    case 22:
      suffix = 'nd';
      break;
    case 3:
    case 23:
      suffix = 'rd';
      break;
    default:
      suffix = 'th';
  }
  return suffix;
};
// returns appropriate month abbreviation
const getMonthAbbr = (month: number) => {
  switch (month) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return 'Jan';
  }
};

export const getTimeDifference = (timestamp: string) => {
  const secondsBefore =
    Math.abs(new Date().getTime() - new Date(timestamp).getTime()) / 1000;
  if (secondsBefore < 60) {
    return 'Just now';
  } else if (secondsBefore < 3600) {
    let time = Math.floor(secondsBefore / 60);
    return `${time} min ago`;
  } else if (secondsBefore < 86400) {
    let time = Math.floor(secondsBefore / 3600);
    return `${time} hr ago`;
  } else if (secondsBefore < 604800) {
    let time = Math.floor(secondsBefore / 86400);
    return `${time} day${time > 1 ? 's' : ''} ago`;
  } else if (secondsBefore < 2592000) {
    let time = Math.floor(secondsBefore / 604800);
    return `${time} week${time > 1 ? 's' : ''} ago`;
  } else if (secondsBefore < 31536000) {
    let time = Math.floor(secondsBefore / 2592000);
    return `${time} month${time > 1 ? 's' : ''} ago`;
  } else {
    let time = Math.floor(secondsBefore / 31536000);
    return `${time} year${time > 1 ? 's' : ''} ago`;
  }
};
