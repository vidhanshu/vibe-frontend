import Container from './Container';
import React from 'react';
import {SCREEN_WIDTH} from '../config/constant';
import {View} from 'react-native';
import {useAppSelector} from '../hooks';

const Loading = () => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View className="flex-1">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <Container key={`${_}/${Math.random()}`}>
          <View
            className={`h-14 rounded-md items-center justify-between my-1 ${theme.bg__colors.bgt}`}
          />
          <View
            style={{
              height: SCREEN_WIDTH - 30,
            }}
            className={`rounded-md items-center justify-between my-1 ${theme.bg__colors.bgt}`}
          />
          <View
            className={`rounded-md  h-20 items-center justify-between my-1 ${theme.bg__colors.bgt}`}
          />
        </Container>
      ))}
    </View>
  );
};

export default Loading;
