import {StyleSheet} from 'react-native';
import {WIDTH, colors, wp} from '@constants/vars';
export const HEIGHT_ITEM = (WIDTH - wp(18.05)) / 6;
export default StyleSheet.create({
  viewInput: {
    borderRadius: wp(2),
    backgroundColor: colors.WHITE,
    padding: wp(4),
    overflow: 'hidden',
  },
  mT5: {
    marginTop: wp(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  viewIcon: {
    padding: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
    alignSelf: 'center',
  },
  viewName: {
    width: '100%',
    borderRadius: wp(2),
    height: wp(13),
    fontSize: wp(5),
    backgroundColor: colors.LIGHT_GRAY,
    marginTop: wp(4),
    paddingHorizontal: wp(2),
    textAlign: 'center',
  },
  viewCircle: {
    height: HEIGHT_ITEM - wp(3),
    aspectRatio: 1,
    borderRadius: HEIGHT_ITEM / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GRAY,
  },
  viewSelected: {
    height: HEIGHT_ITEM,
    aspectRatio: 1,
    borderRadius: HEIGHT_ITEM / 2,
    backgroundColor: colors.WHITE,
    borderWidth: wp(0.8),
    borderColor: colors.LINE_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disableView: {
    opacity: 0.5,
    color: colors.GRAY,
  },
  textHeaderRight: {
    fontSize: wp(5),
    color: colors.PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
