import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {DynamicStack} from './src/navigation';
import NetInfo from '@react-native-community/netinfo';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import store from './src/redux/store';

const App = () => {
  //if app loaded hide splash screen
  useEffect(() => {
    SplashScreen.hide();
    //subscribing the event on netinfo
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    () => unsubscribe();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <StatusBar />
      <Provider store={store}>
        <DynamicStack />
      </Provider>
    </SafeAreaView>
  );
};

export default gestureHandlerRootHOC(App);
