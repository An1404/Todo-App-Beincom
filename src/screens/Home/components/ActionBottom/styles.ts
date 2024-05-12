import {StyleSheet} from 'react-native';
import {WIDTH, colors, wp} from '@constants/vars';
import {isAndroid} from '@src/utils';

export default StyleSheet.create({
  root: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingVertical: isAndroid ? wp(3.5) : wp(2),
    paddingHorizontal: wp(5),
    backgroundColor: colors.SECONDARY_BACKGROUND_COLOR,
  },
  txtAddTask: {
    color: colors.PRIMARY_COLOR,
    marginStart: wp(2),
    fontWeight: 'bold',
    fontSize: wp(4),
  },
  txtAddList: {
    color: colors.PRIMARY_COLOR,
    fontSize: wp(4),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
