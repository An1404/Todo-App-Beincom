import React, {memo} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Icon, colors, wp} from '@constants/vars';

export interface MyListProps {
  name: string;
  total: number;
  color: string;
  lastIndex?: boolean;
}

const MyList = (props: MyListProps) => {
  const {name, total = 0, color, lastIndex} = props;
  return (
    <View style={[styles.root, styles.row]}>
      <View style={[styles.viewIcon, {backgroundColor: color}]}>
        <Icon.AwesSome5 name="list-ul" size={wp(4)} color={colors.WHITE} />
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
    </View>
  );
};

export default memo(MyList);
