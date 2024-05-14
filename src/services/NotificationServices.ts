import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {ChannelObject} from 'react-native-push-notification';
import {isAndroid} from '@src/utils';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {noop} from 'lodash';
import {INotification} from '@src/AppContainer/models';
const channel: ChannelObject = {
  channelId: 'Todo-notification-channel',
  channelName: 'Todo Notification Channel',
};

PushNotification.configure({
  onNotification: function (notification) {
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: false,
  requestPermissions: true,
});

export const runService = () => {
  if (isAndroid) {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else {
    messaging().requestPermission();
  }
  PushNotification.createChannel(channel, created => {
    console.log(
      'NotificationService.createAndroidChannelId(): created=',
      created,
    );
  });
};

export const NotificationSchedule = (
  date: Date,
  title: string,
  message: string,
  id: string,
) => {
  PushNotification.localNotificationSchedule({
    id: id,
    title: title,
    date: date,
    message: message,
    allowWhileIdle: false,
    channelId: channel.channelId,
    smallIcon: 'ic_stat_name',
  });
};

export const deleteNotification = (
  notifications: INotification[],
  id: string,
  updateList: typeof noop,
) => {
  const newNotification = notifications.filter(item => item.id != id);
  updateList(newNotification);
  PushNotification.cancelLocalNotification(id);
};
