import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    width: '100%',
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: wp(1.5),
    alignItems: 'center',
  },
  input: {
    height: wp(10),
    flex: 1,
    marginEnd: wp(2),
    fontSize: wp(3),
  },
});
