import {ITask} from '@src/AppContainer/models';
import AppLayout from '@src/components/AppLayout';
import React from 'react';
import {ListRenderItemInfo, Text, TouchableOpacity} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import TaskCategoryItem from './components/TaskCategoryItem';
import styles from './styles';
import useTaskCategory from './useTaskCategory';
import {Icon, colors, wp} from '@constants/vars';

const TaskCategory = () => {
  const {
    listTasks,
    listType,
    getTitleByType,
    onCompleteTask,
    handleDeleteTask,
    gotoTaskDetail,
  } = useTaskCategory();
  const renderItemCategory = (rowData: ListRenderItemInfo<ITask>) => {
    return (
      <TaskCategoryItem
        data={rowData.item}
        index={rowData.index}
        onComplete={onCompleteTask}
        gotoDetail={gotoTaskDetail}
      />
    );
  };
  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <Text
        style={[
          styles.sectionTitle,
          {color: section.title.color},
          listType ? styles.title : undefined,
        ]}>
        {section.title.name}
      </Text>
    );
  };
  return (
    <AppLayout>
      {!listType && (
        <Text style={[styles.title, {color: getTitleByType().color}]}>
          {getTitleByType().title}
        </Text>
      )}
      <SwipeListView
        useSectionList
        sections={listTasks}
        renderItem={renderItemCategory}
        renderSectionHeader={renderSectionHeader}
        renderHiddenItem={data => (
          <TouchableOpacity
            style={styles.viewSwipe}
            activeOpacity={0.8}
            onPress={() => handleDeleteTask(data.item)}>
            <Icon.AntDesign name="delete" size={wp(5)} color={colors.WHITE} />
          </TouchableOpacity>
        )}
        disableRightSwipe
        rightOpenValue={-wp(15)}
        showsVerticalScrollIndicator={false}
      />
    </AppLayout>
  );
};

export default TaskCategory;
