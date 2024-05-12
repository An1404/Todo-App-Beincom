import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    flex: 1,
    padding: wp(5),
  },
  iconToday: {
    height: wp(6),
    width: wp(6),
    borderRadius: wp(0.8),
    borderWidth: wp(0.6),
    borderTopWidth: wp(1.8),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.WHITE,
  },
  txtToday: {
    fontSize: wp(2.2),
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  viewContainer: {
    paddingBottom: wp(12),
  },
  viewCategory: {
    paddingTop: wp(5),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  txtMyList: {
    fontWeight: 'bold',
    fontSize: wp(5),
    color: colors.BLACK,
  },
  viewMyList: {
    backgroundColor: colors.WHITE,
    borderRadius: wp(2),
    marginTop: wp(3),
  },
});
