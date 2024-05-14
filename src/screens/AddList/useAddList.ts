import {useContext, useMemo, useState} from 'react';
import {colors} from '@constants/vars';
import {
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import {AppContext, navigationRef} from '@src/AppContainer';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';
import {IAddList} from './models';

const useAddList = () => {
  const route = useRoute();
  const {data: dataProps} = (route.params || {}) as IAddList;
  const [name, setName] = useState(dataProps?.name || '');
  const [icon, setIcon] = useState(dataProps?.icon || 'format-list-bulleted');
  const [color, setColor] = useState(dataProps?.color || colors.PRIMARY_COLOR);

  const {appData, addLists, updateLists} = useContext(AppContext);

  const LIST_COLORS = useMemo(
    () => [
      colors.PRIMARY_COLOR,
      colors.RED,
      colors.LIGHT_GREEN,
      colors.SKY_BLUE,
      colors.BLUE,
      colors.PINK,
    ],
    [],
  );

  const LIST_ICON = useMemo(
    () => [
      'format-list-bulleted',
      'bookmark-outline',
      'key',
      'cake',
      'folder-open',
      'chair',
      'lock-open',
      'school',
    ],
    [],
  );

  const onChangeName = (value: string) => {
    if (value.includes('\n')) return;
    setName(value);
  };

  const onChangeIcon = (value: string) => {
    setIcon(value);
  };

  const onChangeColor = (value: string) => {
    setColor(value);
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (event.nativeEvent.key === 'Enter') {
      event.preventDefault();
      Keyboard.dismiss();
    }
  };

  const handleAddList = () => {
    const listIndex = appData.myLists.findIndex(list => list.name === name);
    if (listIndex === -1) {
      addLists({key: name, name, color, icon});
      navigationRef.goBack();
    } else if (dataProps) {
      const newLists = [...appData.myLists];
      newLists[listIndex] = {...dataProps, key: name, name, color, icon};
      updateLists(newLists);
      navigationRef.goBack();
    } else {
      Toast.show({
        type: 'error',
        text1: 'List is exists',
      });
    }
  };

  return {
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
  };
};

export default useAddList;
