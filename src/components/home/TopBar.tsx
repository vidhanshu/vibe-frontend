import {ADD_STATUS_SCREEN, PEOPLE_CHAT_LIST_SCREEN} from '../../config/screens';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {Image, Text, View} from 'react-native';

import {APP_NAME} from '../../config/constant';
import Container from '../Container';
import IconBtn from '../IconBtn';
import React from 'react';
import {ScreenPropType} from '../../types';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

const TopBar = ({navigation}: ScreenPropType) => {
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <Container
      className={`${theme.bg__colors.bp} flex-row justify-between items-center ${theme.borders.bbt}`}>
      <View className="flex-row items-center gap-x-2">
        <Image
          className="w-[23] h-[21px]"
          source={require('../../assets/images/logo.png')}
        />
        <Text
          className={`${Styles.fonts.pm} ${theme.text__colors.tp} text-2xl`}>
          {APP_NAME}
        </Text>
      </View>
      <View className="flex-row gap-x-2">
        <IconBtn onPress={() => navigation.navigate(ADD_STATUS_SCREEN)}>
          <IonIcons
            color={theme.icon__colors.ip}
            name="camera-outline"
            size={ICON_DEFAULT_SIZE}
          />
        </IconBtn>
        <IconBtn>
          <IonIcons
            onPress={() => navigation.navigate(PEOPLE_CHAT_LIST_SCREEN)}
            color={theme.icon__colors.ip}
            name="ios-chatbubble-outline"
            size={ICON_DEFAULT_SIZE}
          />
        </IconBtn>
      </View>
    </Container>
  );
};

export default TopBar;
