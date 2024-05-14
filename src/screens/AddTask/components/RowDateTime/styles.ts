import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  viewIconDateTime: {
    padding: wp(1.2),
    backgroundColor: colors.BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1),
    marginHorizontal: wp(4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewTitleDateTime: {
    flex: 1,
    justifyContent: 'space-between',
    paddingEnd: wp(4),
    paddingVertical: wp(2),
  },
  txtDate: {
    color: colors.BLACK,
    fontSize: wp(4),
    textTransform: 'capitalize',
  },
  txtTime: {
    color: colors.PRIMARY_COLOR,
    fontSize: wp(2.5),
    textTransform: 'capitalize',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: colors.LIGHT_GRAY,
  },
});
