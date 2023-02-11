import {ScrollView, View} from 'react-native';

import Container from '../Container';
import React from 'react';
import {useAppSelector} from '../../hooks';

const ProfileScreenSkeleton = () => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <ScrollView
      className={`flex-1 ${theme.bg__colors.bp}`}
      showsVerticalScrollIndicator={false}>
      <Container>
        <View className={`rounded-md h-44 w-full ${theme.bg__colors.bgxt}`} />
        <View className={`p-4 rounded-md  ${theme.bg__colors.bgxt} my-2`}>
          <View
            className={`m-auto mt-[-60] rounded-full h-20 w-20 ${theme.bg__colors.bgpurplel}`}
          />
          <View className="flex-row justify-between items-center">
            <View className={`h-10 w-20 ${theme.bg__colors.bgpurplel}`} />
            <View className={`h-10 w-20 ${theme.bg__colors.bgpurplel}`} />
          </View>
          <View className="mt-5">
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
          className={`p-1 justify-center rounded-md flex-row flex-wrap ${theme.bg__colors.bgxt} mt-2`}>
          {[0, 0, 0, 0, 0, 0].map((item, index) => (
            <View
              key={index}
              className={`w-[25%] m-3 h-28 rounded-lg ${theme.bg__colors.bgpurplel}`}
            />
          ))}
        </View>
      </Container>
    </ScrollView>
  );
};

export default ProfileScreenSkeleton;
