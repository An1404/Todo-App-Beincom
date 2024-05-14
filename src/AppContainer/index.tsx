import {
  ADD_LIST_SCREEN,
  ADD_TASK_SCREEN,
  HOME_SCREEN,
  TASK_CATEGORY_SCREEN,
} from '@constants/screenKeys';
import {APP_DATA} from '@constants/storage';
import {Icon, colors, wp} from '@constants/vars';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddList from '@screens/AddList';
import AddTask from '@screens/AddTask';
import Home from '@screens/Home';
import TaskCategory from '@screens/TaskCategory';
import Container from '@src/components/Container';
import React, {createContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {getDataFromStorage} from '../utils';
import {IAppContext, IAppData} from './models';
import useAppContainer from './useAppContainer';
import * as NotificationService from '@src/services/NotificationServices';
import SplashScreen from 'react-native-splash-screen';
const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

const initialAppContext: IAppContext = {
  appData: {
    myLists: [],
    notifications: [],
    tasks: [],
  } as IAppData,
  addTasks: () => {},
  addLists: () => {},
  addNotifications: () => {},
  updateAppData: () => {},
};
export const AppContext = createContext(initialAppContext);

const AppContainer = () => {
  const headerStyle = (screenName: string) => {
    return {
      headerTitle: screenName,
      headerTitleStyle: {fontSize: wp(5)},
      headerStyle: {
        backgroundColor: colors.SECONDARY_BACKGROUND_COLOR,
        borderBottomWidth: 1,
        borderColor: colors.LIGHT_GRAY,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigationRef.goBack()}>
          <Icon.MaterialIcons
            name="arrow-back-ios"
            size={wp(5)}
            color={colors.BLACK}
            style={{marginStart: wp(5)}}
          />
        </TouchableOpacity>
      ),
    };
  };

  const headerModalStyle = (screenName: string) => {
    return {
      headerTitle: screenName,
      headerTitleStyle: {fontSize: wp(5)},
      headerStyle: {
        backgroundColor: colors.SECONDARY_BACKGROUND_COLOR,
        elevation: 0,
        shadowColor: 'transparent',
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigationRef.goBack()}
          style={{marginStart: wp(5)}}>
          <Text style={{fontSize: wp(5), color: colors.PRIMARY_COLOR}}>
            Cancel
          </Text>
        </TouchableOpacity>
      ),
    };
  };

  const [appData, setAppData] = useState<IAppData>({
    ...initialAppContext.appData,
  });

  const {
    addLists,
    updateLists,
    addTasks,
    updateTasks,
    addNotifications,
    updateNotifications,
  } = useAppContainer({
    setAppData,
  });

  useEffect(() => {
    getDataFromStorage(APP_DATA, (result: IAppData) => {
      if (!result?.myLists?.length) {
        addLists({
          key: 'Tasks',
          name: 'Tasks',
          icon: 'home',
          color: colors.PRIMARY_COLOR,
        });
      } else {
        let newNotifications = result.notifications;
        if (newNotifications) {
          const now = Date.now();
          newNotifications = result.notifications.filter(
            item => new Date(item.dateTime).getTime() > now,
          );
        }
        setAppData({...result, notifications: newNotifications});
      }
    });
    NotificationService.runService();
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <AppContext.Provider
        value={{
          appData,
          updateAppData: setAppData,
          addTasks,
          updateTasks,
          addLists,
          updateLists,
          addNotifications,
          updateNotifications,
        }}>
        <Container>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen
                name={HOME_SCREEN}
                component={Home}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={TASK_CATEGORY_SCREEN}
                component={TaskCategory}
                options={headerStyle('Lists')}
              />
              <Stack.Screen
                name={ADD_TASK_SCREEN}
                component={AddTask}
                options={{
                  ...headerModalStyle('New Task'),
                  presentation: 'modal',
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen
                name={ADD_LIST_SCREEN}
                component={AddList}
                options={{
                  ...headerModalStyle('New List'),
                  presentation: 'modal',
                  headerTitleAlign: 'center',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
        </Container>
      </AppContext.Provider>
    </SafeAreaProvider>
  );
};

export default AppContainer;
