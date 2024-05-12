import AwesSome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

export const colors = {
  PRIMARY_COLOR: '#7F56C7',
  SECONDARY_COLOR: '#E2DBF4',
  PRIMARY_TEXT_COLOR: '#4E4D65',
  SECONDARY_TEXT_COLOR: '#C1C1CB',
  PRIMARY_BACKGROUND_COLOR: '#EEECF2',
  SECONDARY_BACKGROUND_COLOR: '#f5f5f5',
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#DEDEDE',
  GRAY: '#828385',
  BLACK: '#000000',
  GREEN: '#008000',
};

export const Icon = {
  AwesSome5,
  EvilIcons,
  AntDesign,
  Entypo,
  MaterialIcons,
};

export const wp = (num: number) => widthPercentageToDP(`${num}%`);

export const WIDTH = Dimensions.get('window').width;
