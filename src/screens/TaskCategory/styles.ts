import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: wp(6),
    marginVertical: wp(2),
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: wp(4),
    fontWeight: '600',
  },
  viewSwipe: {
    height: '100%',
    backgroundColor: colors.RED,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    alignSelf: 'flex-end',
  },
});
