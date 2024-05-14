import {ADD_LIST_SCREEN, TASK_CATEGORY_SCREEN} from '@constants/screenKeys';
import {AppContext, navigationRef} from '@src/AppContainer';
import {useContext} from 'react';
import {IMyList} from '@src/AppContainer/models';
import {Alert, ListRenderItemInfo} from 'react-native';
import {RowMap} from 'react-native-swipe-list-view';

const useHome = () => {
  const {appData, updateLists} = useContext(AppContext);

  const gotoTaskCategory = (type: string, listType?: string) => {
    navigationRef.navigate(TASK_CATEGORY_SCREEN, {type, listType});
  };

  const gotoListDetail = (
    data: ListRenderItemInfo<IMyList>,
    dataMap: RowMap<IMyList>,
  ) => {
    dataMap[data.item.key].closeRow();
    navigationRef.navigate(ADD_LIST_SCREEN, {data: data.item});
  };

  const handleDeleteList = (data: IMyList) => {
    Alert.alert(
      `Delete list "${data.name}"`,
      'This will delete all tasks in this list',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            const newLists = appData.myLists?.filter(
              item => item.name != data.name,
            );
            updateLists(newLists);
          },
        },
      ],
    );
  };

  return {
    appData,
    gotoListDetail,
    gotoTaskCategory,
    handleDeleteList,
  };
};

export default useHome;
