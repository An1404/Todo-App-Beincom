import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    height: wp(8),
    aspectRatio: 1,
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
  },
  txtPrimary: {
    fontSize: wp(4),
    color: colors.BLACK,
  },
  iconArrow: {
    marginHorizontal: wp(2),
  },
  viewInfo: {
    flex: 1,
    justifyContent: 'space-between',
    borderColor: colors.LIGHT_GRAY,
    paddingVertical: wp(3),
  },
  txtGray: {
    color: colors.GRAY,
  },
});
