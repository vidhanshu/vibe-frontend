import {
  ADD_STATUS_SCREEN,
  CHAT_SCREEN,
  COMMENTS_SCREEN,
  EDIT_PROFILE_SCREEN,
  HOME_SCREEN_TABS,
  LIKED_BY_SCREEN,
  PEOPLE_CHAT_LIST_SCREEN,
  SETTINGS_SCREEN,
  SIGNLE_POST_SCREEN,
  STATUS_SCREEN,
} from '../../config/screens';
import {
  AddStatus,
  Chat,
  Comments,
  EditProfile,
  PeopleChatList,
  Settings,
  SinglePost,
  Status,
} from '../../screens';

import HomeTabs from './BottomTabsStack';
import LikedBy from '../../screens/liked by/LikedBy';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          statusBarAnimation: 'slide',
          statusBarStyle: 'auto',
          orientation: 'portrait_up',
          animationDuration: 300,
        }}>
        <Stack.Screen name={HOME_SCREEN_TABS} component={HomeTabs} />
        <Stack.Screen name={CHAT_SCREEN} component={Chat} />
        <Stack.Screen name={STATUS_SCREEN} component={Status} />
        <Stack.Screen name={COMMENTS_SCREEN} component={Comments} />
        <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfile} />
        <Stack.Screen name={SIGNLE_POST_SCREEN} component={SinglePost} />
        <Stack.Screen name={SETTINGS_SCREEN} component={Settings} />
        <Stack.Screen name={LIKED_BY_SCREEN} component={LikedBy} />
        <Stack.Screen
          name={PEOPLE_CHAT_LIST_SCREEN}
          component={PeopleChatList}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_left',
            statusBarAnimation: 'slide',
            orientation: 'portrait_up',
          }}
          name={ADD_STATUS_SCREEN}
          component={AddStatus}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
