import {AppContext, navigationRef} from '@src/AppContainer';
import {useContext, useEffect, useState} from 'react';
import {IDateType, IMyList, ITask} from '@src/AppContainer/models';
import moment from 'moment';
import {
  NotificationSchedule,
  deleteNotification,
} from '@src/services/NotificationServices';
import {generateId} from '@src/utils';
import {colors} from '@constants/vars';
import {useRoute} from '@react-navigation/native';
import {get} from 'lodash';

const useAddTask = () => {
  const route = useRoute();
  const propsData: ITask = get(route, 'params.data') || ({} as ITask);
  const {
    appData,
    addTasks,
    addLists,
    addNotifications,
    updateTasks,
    updateNotifications,
  } = useContext(AppContext);

  const [activeSectionDateTime, setActiveSectionDate] = useState<number[]>([]);
  const [isDateOn, setIsDateOn] = useState(false);
  const [isTimeOn, setIsTimeOn] = useState(false);
  const [listSelected, addListSelected] = useState(propsData?.listType || '');
  const [taskTitle, setTaskTitle] = useState(propsData?.title || '');
  const [notes, setNotes] = useState(propsData?.notes || '');

  const [dateTimeSelected, setDateTimeSelected] = useState({
    date: new Date(),
    time: new Date(),
  });

  useEffect(() => {
    if (propsData?.listType) {
      addListSelected(propsData?.listType);
    } else if (appData?.myLists.length) {
      addListSelected(appData.myLists[0].name);
    } else {
      addLists({
        key: 'Tasks',
        name: 'Tasks',
        icon: 'home',
        color: colors.PRIMARY_COLOR,
      });
    }
  }, [addLists, appData.myLists, propsData?.listType]);

  useEffect(() => {
    if (!propsData.dateTime) return;
    if (propsData?.dateType === IDateType.Date) {
      setIsDateOn(true);
      setDateTimeSelected({
        date: new Date(propsData.dateTime),
        time: new Date(),
      });
    } else if (propsData?.dateType === IDateType.DateTime) {
      setIsDateOn(true);
      setIsTimeOn(true);
      setDateTimeSelected({
        date: new Date(propsData.dateTime),
        time: new Date(propsData.dateTime),
      });
    }
  }, [propsData.dateTime, propsData?.dateType]);

  const updateSectionDateTime = (value: number[]) => {
    if ((!isDateOn && !value[0]) || (value[0] && !isTimeOn)) return;
    setActiveSectionDate(value);
  };

  const onToggleDate = (value: boolean, section?: number) => {
    setIsDateOn(value);
    if (!value) {
      setIsTimeOn(false);
      setActiveSectionDate([]);
    } else {
      const now = new Date();
      setDateTimeSelected({date: now, time: now});
      setActiveSectionDate([section || 0]);
    }
  };

  const onToggleTime = (value: boolean) => {
    setIsTimeOn(value);
    if (!value) {
      setActiveSectionDate([]);
    } else {
      if (!isDateOn) {
        onToggleDate(true, 1);
      } else {
        const now = new Date();

        setDateTimeSelected({date: now, time: now});
        setActiveSectionDate([1]);
      }
    }
  };

  const onSelectList = (value: IMyList) => {
    addListSelected(value.name);
  };

  const onDateChange = (value: Date) => {
    setDateTimeSelected(preValue => {
      return {...preValue, date: value};
    });
  };

  const onTimeChange = (value: Date) => {
    setDateTimeSelected(preValue => {
      return {...preValue, time: value};
    });
  };

  const onChangeTaskTitle = (value: string) => {
    setTaskTitle(value);
  };

  const onChangeNotes = (value: string) => {
    setNotes(value);
  };

  const addOrUpdateTask = (data: ITask) => {
    if (propsData.title) {
      if (propsData.notificationId && !propsData?.completedAt) {
        deleteNotification(
          appData.notifications,
          propsData.notificationId,
          updateNotifications,
        );
      }

      const taskIndex = appData.tasks.findIndex(
        task => task.id === propsData.id,
      );
      const newTasks = [...appData.tasks];
      newTasks[taskIndex] = {...propsData, ...data};
      updateTasks(newTasks);
    } else addTasks(data);
  };

  const handleAddTask = () => {
    const {date, time} = dateTimeSelected;

    const mergedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds(),
      time.getMilliseconds(),
    );
    const currentDateTime = moment();
    const isFutureDateTime = moment(mergedDate).isAfter(currentDateTime);
    const newId = generateId();

    if (isDateOn && isTimeOn) {
      const notificationId = `${
        (appData.notifications[appData.notifications.length - 1]?.id || 0) * 1 +
        1
      }`;
      if (isFutureDateTime && !propsData?.completedAt) {
        addNotifications({id: notificationId, dateTime: mergedDate});
        NotificationSchedule(
          mergedDate,
          listSelected,
          taskTitle,
          notificationId,
        );
      }
      addOrUpdateTask({
        id: newId,
        title: taskTitle,
        dateTime: mergedDate,
        dateType: IDateType.DateTime,
        notes: notes,
        listType: listSelected,
        notificationId: notificationId,
      });
    } else if (isDateOn) {
      addOrUpdateTask({
        id: newId,
        title: taskTitle,
        dateTime: mergedDate,
        dateType: IDateType.Date,
        notes: notes,
        listType: listSelected,
      });
    } else {
      addOrUpdateTask({
        id: newId,
        title: taskTitle,
        notes: notes,
        listType: listSelected,
      });
    }
    navigationRef.goBack();
  };

  return {
    isDateOn,
    isTimeOn,
    activeSectionDateTime,
    listSelected,
    dateTimeSelected,
    appData,
    taskTitle,
    notes,
    propsData,
    updateSectionDateTime,
    onToggleDate,
    onToggleTime,
    onSelectList,
    onDateChange,
    onTimeChange,
    onChangeTaskTitle,
    onChangeNotes,
    handleAddTask,
  };
};
export default useAddTask;
