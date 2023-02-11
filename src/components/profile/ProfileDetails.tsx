import {
  ADD_POST_SCREEN,
  ADD_STATUS_SCREEN,
  CHAT_SCREEN,
  EDIT_PROFILE_SCREEN,
  STATUS_SCREEN,
} from '../../config/screens';
import {Image, Pressable, Text, View} from 'react-native';
import {
  LINEAR_GRADIENT_START_COLOR,
  LINEAR_GRADIENT_STOP_COLOR,
  Styles,
} from '../../styles';
import {countShortForm, getTimeDifference} from '../../utils';

import {BLANK_PROFILE_IMG} from '../../config/constant';
import Container from '../Container';
import CustomeButton from '../CustomeButton';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {UserDataType} from '../../types';
import {useAppSelector} from '../../hooks';

interface ProfileDetailsType {
  navigation: any;
  route: any;
  data: UserDataType;
}
const ProfileDetails = ({navigation, data, route}: ProfileDetailsType) => {
  const {theme} = useAppSelector(state => state.theme);
  const id = useAppSelector(state => state.auth.user?.id);
  return (
    <View className={`${theme.borders.bbt}`}>
      <Container className="flex-row justify-center gap-x-5">
        <View>
          <Text
            className={`${Styles.fonts.psb} text-xl ${theme.text__colors.tp} text-center`}>
            {countShortForm(data.followers || 0)}
          </Text>
          <Text
            className={`${Styles.fonts.pl} text-sm ${theme.text__colors.tp} text-center`}>
            Followers
          </Text>
        </View>
        <LinearGradient
          colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}
          className="mt-[-50px] w-21 p-1 h-[89] rounded-full">
          <Pressable
            onPress={() => {
              if (data.id === id) {
                return navigation.navigate(ADD_STATUS_SCREEN);
              }
              navigation.navigate(STATUS_SCREEN);
            }}>
            <Image
              className="w-20 h-20 rounded-full"
              source={{
                uri: data.profile || BLANK_PROFILE_IMG,
              }}
            />
          </Pressable>
        </LinearGradient>
        <View>
          <Text
            className={`${Styles.fonts.psb} text-xl ${theme.text__colors.tp} text-center`}>
            {countShortForm(data.following || 0)}
          </Text>
          <Text
            className={`${Styles.fonts.pl} text-sm ${theme.text__colors.tp} text-center`}>
            Following
          </Text>
        </View>
      </Container>
      <Text
        className={`${Styles.fonts.pl}  max-w-[200px] m-auto mt-2 text-sm text-blue-500 text-center`}>
        Joined {getTimeDifference(data.registeredAt || `${Date.now()}`)}
      </Text>
      <Container>
        <Text
          className={`${Styles.fonts.psb} text-xl ${theme.text__colors.tp} text-center`}>
          {data.name}
        </Text>
        <Text
          className={`${Styles.fonts.pl}  max-w-[200px] m-auto mt-2 text-xs ${theme.text__colors.tt} text-center`}>
          @{data.username}
        </Text>
        <Text
          className={`${Styles.fonts.pl}  max-w-[200px] m-auto mt-2 text-sm ${theme.text__colors.txt} text-center`}>
          {data.bio || 'No bio'}
        </Text>
        {data.id !== id ? (
          <View className="flex-row justify-center gap-x-4 my-4">
            <CustomeButton>Follow</CustomeButton>
            <CustomeButton
              onPress={() => navigation.navigate(CHAT_SCREEN, route)}
              variant="secondary">
              Message
            </CustomeButton>
          </View>
        ) : (
          <View className="flex-row justify-center gap-x-4 my-4">
            <CustomeButton
              onPress={() => navigation.navigate(EDIT_PROFILE_SCREEN)}>
              Edit Profile
            </CustomeButton>
            <CustomeButton
              onPress={() => navigation.navigate(ADD_POST_SCREEN)}
              variant="secondary">
              Add Post
            </CustomeButton>
          </View>
        )}
      </Container>
    </View>
  );
};

export default ProfileDetails;
