import {ActivityIndicator, Image, Text, View} from 'react-native';
import {Socket, io} from 'socket.io-client';
import {useAppDispatch, useAppSelector} from '../hooks';

import AppNavigation from './stacks/ApplicationStack';
import AuthenticationStack from './stacks/AuthenticationStack';
import {BASE_URL} from '../config';
import React from 'react';
import {Styles} from '../styles';
import {checkForUserLogin} from '../utils';
import {login} from '../redux/reducers';

export const SocketContext = React.createContext<Socket>({} as Socket);

const DynamicStack = () => {
  const [loading, setLoading] = React.useState(true);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  //socket.io stuff
  const socket = io(BASE_URL, {
    autoConnect: false,
  });

  React.useEffect(() => {
    socket.connect();
    return () => {
      socket.close();
      console.log('disconnected');
    };
  }, [socket]);

  /**
   * @abstract check for user login
   */
  const checkForUserLoginHandler = React.useCallback(async () => {
    const res = await checkForUserLogin();
    if (res.isLoggedIn) {
      dispatch(
        login({
          user: res.user,
          token: res.token,
        }),
      );
    }
    setLoading(false);
  }, [dispatch]);

  //checking for user login
  React.useEffect(() => {
    checkForUserLoginHandler();
  }, [checkForUserLoginHandler]);

  //until the app is checking for user login show loading screen
  if (loading) {
    return (
      <View className="justify-center items-center flex-1 bg-black">
        <View className="gap-y-5">
          <Image
            className="w-[42] h-[38px] m-auto"
            source={require('../assets/images/logo.png')}
          />
          <ActivityIndicator color={'green'} size={'large'} />
          <Text className={`${Styles.fonts.pr} text-white`}>
            Checking Your Authentication
          </Text>
        </View>
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <SocketContext.Provider value={socket}>
        <AppNavigation />
      </SocketContext.Provider>
    );
  } else {
    return <AuthenticationStack />;
  }
};

export default DynamicStack;
