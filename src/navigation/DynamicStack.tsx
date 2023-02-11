import {ActivityIndicator, Image, Text, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks';

import AppNavigation from './stacks/ApplicationStack';
import AuthenticationStack from './stacks/AuthenticationStack';
import React from 'react';
import {checkForUserLogin} from '../utils';
import {login} from '../redux/reducers';
import {Styles} from '../styles';

const DynamicStack = () => {
  const [loading, setLoading] = React.useState(true);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  //checking for user login
  React.useEffect(() => {
    checkForUserLoginHandler();
  }, []);

  /**
   * @abstract check for user login
   */
  const checkForUserLoginHandler = async () => {
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
  };

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
    return <AppNavigation />;
  } else {
    return <AuthenticationStack />;
  }
};

export default DynamicStack;
