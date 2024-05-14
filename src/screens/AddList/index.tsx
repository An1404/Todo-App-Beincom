import React, {useCallback, useEffect} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppLayout from '@src/components/AppLayout';
import styles, {HEIGHT_ITEM} from './styles';
import useAddList from './useAddList';
import {Icon, colors, wp} from '@constants/vars';
import {isAndroid} from '@src/utils';
import {IAddList} from './models';

const AddList = ({navigation}: IAddList) => {
  const {
    name,
    icon,
    color,
    dataProps,
    LIST_COLORS,
    LIST_ICON,
    onChangeName,
    onChangeIcon,
    onChangeColor,
    handleKeyPress,
    handleAddList,
  } = useAddList();

  const headerRight = useCallback(() => {
    const isDisable = !name;
    return (
      <TouchableOpacity
        onPress={handleAddList}
        style={{marginEnd: wp(5)}}
        disabled={isDisable}>
        <Text style={[styles.textHeaderRight, isDisable && styles.disableView]}>
          {dataProps?.name ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>
    );
  }, [dataProps?.name, handleAddList, name]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
      headerTitle: dataProps?.name,
    });
  }, [dataProps?.name, headerRight, navigation]);
  return (
    <AppLayout>
      <ScrollView>
        <View style={styles.viewInput}>
          <View style={[styles.viewIcon, {backgroundColor: color}]}>
            <Icon.MaterialIcons
              name={icon}
              size={wp(10)}
              color={colors.WHITE}
            />
          </View>
          <TextInput
            style={[styles.viewName, {color: color}]}
            onChangeText={onChangeName}
            placeholder="List Name"
            multiline={isAndroid ? name.length < 5 : false}
            numberOfLines={1}
            returnKeyType="done"
            onKeyPress={handleKeyPress}
            value={name}
          />
        </View>
        <View style={[styles.viewInput, styles.mT5]}>
          {LIST_COLORS.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.viewSelected,
                {borderWidth: color === item ? wp(0.6) : 0},
              ]}
              onPress={() => onChangeColor(item)}
              activeOpacity={0.8}>
              <View style={[styles.viewCircle, {backgroundColor: item}]} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={[styles.viewInput, styles.mT5]}>
          {LIST_ICON.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.viewSelected,
                {borderWidth: icon === item ? wp(0.6) : 0},
              ]}
              onPress={() => onChangeIcon(item)}
              activeOpacity={0.8}>
              <View style={styles.viewCircle}>
                <Icon.MaterialIcons
                  name={item}
                  color={colors.BLACK}
                  size={HEIGHT_ITEM - wp(8)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default AddList;
