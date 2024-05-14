import {ADD_TASK_SCREEN} from '@constants/screenKeys';
import {colors} from '@constants/vars';
import {useRoute} from '@react-navigation/native';
import {AppContext, navigationRef} from '@src/AppContainer';
import {ITask} from '@src/AppContainer/models';
import moment from 'moment';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {CategoryType} from '../Home/models';
import {deleteNotification} from '@src/services/NotificationServices';
interface ITaskCategory {
  type: CategoryType;
  listType: string;
}
const useTaskCategory = () => {
  const route = useRoute();
  const {type, listType} = (route.params || {}) as ITaskCategory;
  const {appData, updateTasks, updateNotifications} = useContext(AppContext);
  const skipReload = useRef(false);

  const filterDataByType = useCallback(() => {
    switch (type) {
      case CategoryType.TODAY:
        return appData.tasks?.filter(item => {
          if (!item?.dateTime) {
            return false;
          }
          return (
            moment(item.dateTime).isSame(moment(), 'day') && !item.completedAt
          );
        });
      case CategoryType.COMPLETED:
        return appData.tasks?.filter(item => item.completedAt);
      case CategoryType.MY_LIST:
        return appData.tasks?.filter(
          item => item.listType === listType && !item.completedAt,
        );
      case CategoryType.ALL:
      default:
        return appData.tasks.filter(item => !item.completedAt);
    }
  }, [appData.tasks, type, listType]);

  const taskFilter = useMemo(() => {
    let classifiedData = {} as {[key: string]: any};
    const listTasksFilter = filterDataByType();

    listTasksFilter.forEach(item => {
      if (classifiedData[item.listType]) {
        classifiedData[item.listType].push(item);
      } else {
        classifiedData[item.listType] = [item];
      }
    });

    const result = Object.keys(classifiedData).map(key => {
      const list = appData.myLists.find(item => item.name == key);
      return {
        title: {name: key, color: list?.color},
        data: classifiedData[key],
      };
    });

    return result;
  }, [appData.myLists, filterDataByType]);

  const [listTasks, setListTasks] = useState([]);

  useEffect(() => {
    !skipReload.current && setListTasks(taskFilter);
    skipReload.current = false;
  }, [skipReload, taskFilter]);

  const getTitleByType = () => {
    switch (type) {
      case CategoryType.TODAY:
        return {title: CategoryType.TODAY, color: colors.PRIMARY_COLOR};
      case CategoryType.COMPLETED:
        return {title: CategoryType.COMPLETED, color: colors.GREEN};
      case CategoryType.ALL:
      default:
        return {title: CategoryType.ALL, color: colors.BLACK};
    }
  };

  const onCompleteTask = (task: ITask, index: number) => {
    skipReload.current = true;
    const dataClone = [...appData.tasks];
    dataClone[index] = task;

    deleteNotification(
      appData.notifications,
      task.notificationId,
      updateNotifications,
    );
    updateTasks(dataClone);
  };

  const handleDeleteTask = (data: ITask) => {
    const newTasks = appData.tasks?.filter(item => item.id != data.id);
    updateTasks(newTasks);
  };

  const gotoTaskDetail = (data: ITask) => {
    navigationRef.navigate(ADD_TASK_SCREEN, {data});
  };

  return {
    listTasks,
    listType,
    getTitleByType,
    onCompleteTask,
    handleDeleteTask,
    gotoTaskDetail,
  };
};

export default useTaskCategory;
