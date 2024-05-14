import React, {ReactNode, memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {noop} from 'lodash';

export interface CategoryProps {
  icon: ReactNode;
  total: number;
  name: string;
  backgroundIconColor: string;
  onPress?: typeof noop;
}

const Category = (props: CategoryProps) => {
  const {icon, total, name, backgroundIconColor, onPress} = props;
  return (
    <TouchableOpacity style={styles.root} activeOpacity={0.8} onPress={onPress}>
      <View>
        <View style={[styles.viewIcon, {backgroundColor: backgroundIconColor}]}>
          {icon}
        </View>
        <Text style={styles.txtName}>{name}</Text>
      </View>
      <Text style={styles.txtTotal}>{total}</Text>
    </TouchableOpacity>
  );
};

export default memo(Category);
