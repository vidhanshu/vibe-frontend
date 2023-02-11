import {AUTHENTICATION_SCREEN} from '../../config/screens';
import {Authentication} from '../../screens';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          statusBarAnimation: 'slide',
          statusBarStyle: 'auto',
          orientation: 'portrait_up',
        }}>
        <Stack.Screen name={AUTHENTICATION_SCREEN} component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationStack;
