import {
  ADD_POST_SCREEN,
  HOME_SCREEN,
  NOTIFICATIONS_SCREEN,
  PROFILE_SCREEN,
  SEARCH_SCREEN,
} from '../../config/screens';
import {Home, Notifications, Post, Profile, Search} from '../../screens';

import {BottomNavigationTabs} from '../../components';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigationTabs {...props} />}
      id={'ROOT_BOTTOM_TAB_BAR_NAVIGATOR_ID'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
        tabBarHideOnKeyboard: true,
        // loads up all the needed data at render
        lazy: true,
      }}
      backBehavior="history"
      initialRouteName={HOME_SCREEN}>
      <Tab.Screen
        name={HOME_SCREEN}
        component={Home}
        options={() => ({
          tabBarShowLabel: false,
        })}
      />
      <Tab.Screen
        options={() => ({
          tabBarShowLabel: false,
        })}
        name={NOTIFICATIONS_SCREEN}
        component={Notifications}
      />
      <Tab.Screen
        options={() => ({
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        })}
        name={ADD_POST_SCREEN}
        component={Post}
      />
      <Tab.Screen
        options={() => ({
          tabBarShowLabel: false,
        })}
        name={SEARCH_SCREEN}
        component={Search}
      />
      <Tab.Screen
        options={() => ({
          tabBarShowLabel: false,
        })}
        name={PROFILE_SCREEN}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
