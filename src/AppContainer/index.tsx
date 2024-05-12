import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '@screens/Home';
import {HOME_SCREEN} from '@constants/screenKeys';
import {SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();

const AppContainer = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={HOME_SCREEN}
            component={Home}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppContainer;
