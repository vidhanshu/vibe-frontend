import {AntIcons, ICON_DEFAULT_SIZE, IonIcons} from '../config/icons';
import {TextInput, TextInputProps, View} from 'react-native';

import Container from './Container';
import React from 'react';
import {ScreenPropType} from '../types';
import {Styles} from '../styles';
import {useAppSelector} from '../hooks';

const SearchBarWithBackButton = ({
  navigation,
  shouldShowBackButton = true,
  ...props
}: ScreenPropType &
  TextInputProps & {
    shouldShowBackButton?: boolean;
  }) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <Container className={`${theme.bg__colors.bp} py-2 ${theme.borders.bbt}`}>
      <View className="flex-row gap-x-2 items-center  justify-between">
        {shouldShowBackButton && (
          <AntIcons
            onPress={() => navigation.goBack()}
            name="left"
            size={ICON_DEFAULT_SIZE}
            color={theme.colors.s}
          />
        )}
        <View
          className={`${theme.bg__colors.bgt} flex-row items-center px-2 rounded-md`}>
          <IonIcons
            name="ios-search-outline"
            size={ICON_DEFAULT_SIZE}
            color={'gray'}
          />
          <TextInput
            placeholder="Search people for message..."
            placeholderTextColor={'#8b949e'}
            {...props}
            className={`${Styles.fonts.pr} ml-2 w-60 ${theme.text__colors.tp} ${
              props.className ? props.className : ''
            }`}
          />
        </View>
      </View>
    </Container>
  );
};

export default SearchBarWithBackButton;
