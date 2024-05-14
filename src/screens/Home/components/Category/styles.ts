import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    width: '48%',
    backgroundColor: colors.WHITE,
    borderRadius: wp(3),
    justifyContent: 'space-between',
    padding: wp(3),
    marginBottom: wp(3),
    flexDirection: 'row',
  },
  viewIcon: {
    padding: wp(1),
    height: wp(10),
    width: wp(10),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtName: {
    fontWeight: '600',
    color: colors.GRAY,
    marginTop: wp(2),
    fontSize: wp(4.5),
    textTransform: 'capitalize',
  },
  txtTotal: {
    fontSize: wp(8),
    fontWeight: '600',
    color: colors.BLACK,
  },
});
