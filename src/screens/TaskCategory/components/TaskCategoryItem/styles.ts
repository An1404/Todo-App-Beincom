import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND_COLOR,
  },
  w100: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    height: wp(5.5),
    aspectRatio: 1,
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp(2),
    borderWidth: wp(0.5),
    borderColor: colors.LINE_GRAY,
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
    borderBottomWidth: 1,
  },
  txtGray: {
    color: colors.GRAY,
    fontSize: wp(3.5),
  },
  radioSelected: {
    height: wp(4),
    aspectRatio: 1,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: wp(2),
  },
  txtCompleted: {
    color: colors.GRAY,
    textDecorationLine: 'line-through',
  },
});
