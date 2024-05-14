import {Icon, colors, wp} from '@constants/vars';
import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
export interface MyListProps {
  name: string;
  total: number;
  color: string;
  icon: string;
  lastIndex?: boolean;
  onPress: () => void;
}

const MyList = (props: MyListProps) => {
  const {name, total = 0, color, icon, lastIndex, onPress} = props;
  return (
    <TouchableOpacity
      style={[styles.root, styles.row]}
      activeOpacity={1}
      onPress={onPress}>
      <View style={[styles.viewIcon, {backgroundColor: color}]}>
        <Icon.MaterialIcons name={icon} size={wp(5)} color={colors.WHITE} />
      </View>
      <View
        style={[
          styles.row,
          styles.viewInfo,
          {borderBottomWidth: lastIndex ? 0 : 1},
        ]}>
        <Text style={styles.txtPrimary}>{name}</Text>
        <View style={styles.row}>
          <Text style={[styles.txtPrimary, styles.txtGray]}>{total}</Text>
          <Icon.MaterialIcons
            name="arrow-forward-ios"
            size={wp(3.5)}
            color={colors.GRAY}
            style={styles.iconArrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MyList);
