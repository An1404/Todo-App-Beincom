export interface IMyList {
  key: string;
  name: string;
  color: string;
  icon: string;
}
export enum IDateType {
  Date = 'date',
  DateTime = 'dateTime',
}
export interface ITask {
  id: string;
  title: string;
  notes?: string;
  dateTime?: Date;
  dateType?: IDateType;
  notificationId?: string;
  listType: string;
  completedAt?: Date;
}

export interface INotification {
  id: string;
  dateTime: Date;
}
export interface IAppData {
  tasks: ITask[];
  myLists: IMyList[];
  notifications: INotification[];
}

export interface IAppContext {
  appData: IAppData;
  addTasks: (newTask: ITask) => void;
  updateTasks: (tasks: ITask[]) => void;
  addLists: (newList: IMyList) => void;
  updateLists: (lists: IMyList[]) => void;
  addNotifications: (newNotification: INotification) => void;
  updateNotifications: (notifications: INotification[]) => void;
  updateAppData: (appData: IAppData) => void;
}
