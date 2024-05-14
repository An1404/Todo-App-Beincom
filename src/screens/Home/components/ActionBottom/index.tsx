import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Icon, colors, wp} from '@constants/vars';
import useActionBottom from './useActionBottom';

const ActionBottom = () => {
  const {gotoAddTask, gotoAddList} = useActionBottom();
  return (
    <View style={styles.root}>
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.8}
        onPress={gotoAddTask}>
        <Icon.AntDesign
          name="pluscircle"
          size={wp(6)}
          color={colors.PRIMARY_COLOR}
        />
        <Text style={styles.txtAddTask}>New Task</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={gotoAddList}>
        <Text style={styles.txtAddList}>Add List</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ActionBottom);
