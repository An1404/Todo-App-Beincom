import {StyleSheet} from 'react-native';
import {colors, wp} from '@constants/vars';

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  viewInput: {
    borderRadius: wp(2),
    backgroundColor: colors.WHITE,
    paddingStart: wp(4),
    overflow: 'hidden',
  },
  input: {
    paddingEnd: wp(4),
    fontSize: wp(4),
  },
  inputTitle: {
    borderBottomWidth: 1,
    borderColor: colors.LIGHT_GRAY,
    maxHeight: wp(30),
  },
  inputNote: {
    minHeight: wp(30),
    maxHeight: wp(50),
    textAlignVertical: 'top',
  },
  mT5: {
    marginTop: wp(5),
    paddingStart: 0,
  },
  viewSelectList: {
    paddingVertical: wp(2),
    paddingHorizontal: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelSelectList: {
    position: 'absolute',
    zIndex: 999,
    fontSize: wp(4),
    top: wp(3.5),
    left: wp(4),
    color: colors.BLACK,
  },
  txtListSelected: {
    textAlign: 'right',
  },
  centerView: {
    alignSelf: 'center',
  },
  viewListDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(2),
  },
  viewIconListDropdown: {
    height: wp(6),
    aspectRatio: 1,
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtListDropdown: {
    flex: 1,
    fontSize: wp(3.5),
    marginStart: wp(2),
    color: colors.BLACK,
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
