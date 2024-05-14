import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {IAppData, IDateType} from '@src/AppContainer/models';
import moment from 'moment';
import {DATE_TIME_FORMAT} from '@constants/datetimes';
export const isAndroid = Platform.OS === 'android';

export const generateId = uuidv4;

export const getDataFromStorage = async (key: string, callback: Function) => {
  try {
    await AsyncStorage.getItem(key).then(value => {
      if (value) {
        callback(JSON.parse(value));
      } else {
        console.log(key, ' data from storage empty');
        callback({});
      }
    });
  } catch (err) {
    console.log('get data from storage failed', err);
  }
};
export const saveDataToStorage = async (key: string, info: IAppData) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(info));
    console.log('save info success', info);
  } catch (err) {
    console.log('save to storage error', err);
  }
};

export const getDateFromNow = (value: Date, format: string) => {
  const isToday = moment(value).isSame(moment(), 'day');
  return isToday ? 'Today' : moment(value).format(format);
};

export const convertDateTimeToString = (dateTime: Date, type: IDateType) => {
  if (type === IDateType.Date) {
    return getDateFromNow(dateTime, DATE_TIME_FORMAT.SORT_DATE);
  } else {
    return `${getDateFromNow(dateTime, DATE_TIME_FORMAT.SORT_DATE)}, ${moment(
      dateTime,
    ).format('hh:mm')}`;
  }
};
