import React, {memo} from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';
import {Icon, colors, wp} from '@constants/vars';

export interface SearchProps {}

const Search = (props: SearchProps) => {
  const {} = props;
  return (
    <View style={styles.root}>
      <Icon.EvilIcons name="search" size={wp(6)} color={colors.GRAY} />
      <TextInput style={styles.input} />
      <Icon.AntDesign name="closecircle" size={wp(4)} color={colors.GRAY} />
    </View>
  );
};

export default memo(Search);
