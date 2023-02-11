import {Image, Pressable, Text, View} from 'react-native';

import Container from '../Container';
import {Post1} from '../../types';
import React from 'react';
import {SIGNLE_POST_SCREEN} from '../../config/screens';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

interface ProfileDataType {
  navigation: any;
  data: Post1[];
}
const ProfileData = ({navigation, data}: ProfileDataType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <Container className="pt-5">
      <View className="flex-row flex-wrap gap-2">
        {data.length === 0 ? (
          <View className="flex-1 h-32 justify-center items-center">
            <Text
              className={`${Styles.fonts.pexb} ${theme.text__colors.txt} text-xl`}>
              No Posts Yet
            </Text>
          </View>
        ) : (
          data.map((item, index) => (
            <Pressable
              onPress={() => navigation.navigate(SIGNLE_POST_SCREEN, item)}
              className="w-[30%] h-28 rounded-lg overflow-hidden"
              key={index}>
              <Image className="w-full h-full" source={{uri: item.image}} />
            </Pressable>
          ))
        )}
      </View>
    </Container>
  );
};

export default ProfileData;
