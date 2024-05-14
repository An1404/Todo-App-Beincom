import {APP_DATA} from '@constants/storage';
import {saveDataToStorage} from '@src/utils';
import {IAppData, IMyList, INotification, ITask} from './models';
interface props {
  setAppData: React.Dispatch<React.SetStateAction<IAppData>>;
}

const useAppContainer = (props: props) => {
  const {setAppData} = props;

  const addTasks = (newTask: ITask) => {
    setAppData(preValue => {
      const newData = {
        ...preValue,
        tasks: [...(preValue.tasks || []), newTask],
      };
      saveDataToStorage(APP_DATA, newData);
      return newData;
    });
  };

  const updateTasks = (newTasks: ITask[]) => {
    setAppData(preValue => {
      const newData: IAppData = {...preValue, tasks: [...newTasks]};
      saveDataToStorage(APP_DATA, newData);
      return newData;
    });
  };

  const addLists = (newList: IMyList) => {
    setAppData(preValue => {
      const newData = {
        ...preValue,
        myLists: [...(preValue?.myLists || []), newList],
      };
      saveDataToStorage(APP_DATA, newData);

      return newData;
    });
  };

  const updateLists = (newLists: IMyList[]) => {
    setAppData(preValue => {
      const newData: IAppData = {...preValue, myLists: [...newLists]};
      saveDataToStorage(APP_DATA, newData);
      return newData;
    });
  };

  const addNotifications = (newNotification: INotification) => {
    setAppData(preValue => {
      const newData = {
        ...preValue,
        notifications: [...(preValue.notifications || []), newNotification],
      };
      saveDataToStorage(APP_DATA, newData);
      return newData;
    });
  };

  const updateNotifications = (notifications: INotification[]) => {
    setAppData(preValue => {
      const newData: IAppData = {
        ...preValue,
        notifications: [...notifications],
      };
      saveDataToStorage(APP_DATA, newData);
      return newData;
    });
  };

  return {
    addTasks,
    updateTasks,
    addLists,
    updateLists,
    addNotifications,
    updateNotifications,
  };
};

export default useAppContainer;
