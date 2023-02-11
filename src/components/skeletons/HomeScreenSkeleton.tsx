import {ScrollView, View} from 'react-native';

import Container from '../Container';
import React from 'react';
import {useAppSelector} from '../../hooks';

const HomeScreenSkeleton = () => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <ScrollView
      className={`flex-1 ${theme.bg__colors.bp}`}
      showsVerticalScrollIndicator={false}>
      <Container>
        <View
          className={`rounded-md mt-5 h-10 w-full ${theme.bg__colors.bgxt}`}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className={`p-1 rounded-md  ${theme.bg__colors.bgxt} my-5`}>
          {[0, 0, 0, 0, 0, 0].map((item, index) => (
            <View
              key={index}
              className={`w-20 rounded-full m-3 h-20 ${theme.bg__colors.bgpurplel}`}
            />
          ))}
        </ScrollView>
        <View
          className={`p-1 mt-5 justify-center rounded-md ${theme.bg__colors.bgxt} mt-2`}>
          {[0, 0, 0, 0, 0, 0].map((item, index) => (
            <View key={index} className="mb-8">
              <View className="flex-row items-center">
                <View
                  key={index}
                  className={`w-14 rounded-full m-3 h-14 ${theme.bg__colors.bgpurplel}`}
                />
                <View className="">
                  <View
                    className={`m-auto mt-1 h-2 rounded-full w-32 ${theme.bg__colors.bgpurplel}`}
                  />
                  <View
                    className={`m-auto mt-1 h-2 rounded-full w-32 ${theme.bg__colors.bgpurplel}`}
                  />
                  <View
                    className={`m-auto mt-1 h-2 rounded-full w-32 ${theme.bg__colors.bgpurplel}`}
                  />
                </View>
              </View>
              <View
                className={`w-full h-64 rounded-lg ${theme.bg__colors.bgpurplel}`}
              />
            </View>
          ))}
        </View>
      </Container>
    </ScrollView>
  );
};

export default HomeScreenSkeleton;
