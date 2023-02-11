import {AntIcons, ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {Image, Text, View} from 'react-native';

import Container from '../Container';
import React from 'react';
import {ScreenPropType} from '../../types';
import {Styles} from '../../styles';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useAppSelector} from '../../hooks';

const ChatTop = ({navigation, route}: ScreenPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const {user_name, user_profile} = route.params;
  return (
    <Container
      className={`flex-row justify-between items-center ${theme.bg__colors.bp} py-4 ${theme.borders.bbt}`}>
      <View className="flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <View className="flex-row items-center gap-x-2 mr-4">
            <AntIcons
              name="left"
              size={ICON_DEFAULT_SIZE}
              color={theme.icon__colors.ip}
            />
            <Image
              source={{uri: user_profile}}
              className="w-10 h-10 rounded-full"
            />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            className={`${Styles.fonts.pm} text-base ${theme.text__colors.tp}`}>
            {user_name}
          </Text>
          <Text
            className={`${Styles.fonts.pr} text-xs ${theme.text__colors.tt}`}>
            Last seen 2 hours ago
          </Text>
        </View>
      </View>
      <View className="flex-row gap-x-8 items-center">
        <IonIcons
          name="ios-call-outline"
          size={ICON_DEFAULT_SIZE}
          color={theme.icon__colors.ip}
        />
        <IonIcons
          name="ios-videocam-outline"
          size={ICON_DEFAULT_SIZE}
          color={theme.icon__colors.ip}
        />
      </View>
    </Container>
  );
};

export default ChatTop;
