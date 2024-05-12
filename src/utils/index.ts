import {Platform} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
export const isAndroid = Platform.OS === 'android';

export const generateId = uuidv4();
