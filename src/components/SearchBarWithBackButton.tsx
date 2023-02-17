import {AntIcons, ICON_DEFAULT_SIZE, IonIcons} from '../config/icons';
import React, {useCallback} from 'react';
import {TextInput, TextInputProps, View} from 'react-native';

import Container from './Container';
import {ScreenPropType} from '../types';
import {Styles} from '../styles';
import {useAppSelector} from '../hooks';

const SearchBarWithBackButton = ({
  navigation,
  shouldShowBackButton = true,
  setQuery,
  ...props
}: ScreenPropType &
  TextInputProps & {
    shouldShowBackButton?: boolean;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
  }) => {
  const {theme} = useAppSelector(state => state.theme);
  const handleGoBack = React.useCallback(
    () => navigation.goBack(),
    [navigation],
  );
  const handleCutText = useCallback(() => {
    setQuery('');
  }, [setQuery]);

  return (
    <Container
      className={`${theme.bg__colors.bp} overflow-hidden ${theme.borders.bbt} p-2 w-screen`}>
      <View className="flex-row items-center">
        {shouldShowBackButton && (
          <AntIcons
            onPress={handleGoBack}
            name="left"
            size={ICON_DEFAULT_SIZE}
            color={theme.colors.s}
            className="mr-2"
          />
        )}
        <View
          className={`${theme.bg__colors.bgt} flex-row items-center rounded-md px-2 flex-1`}>
          <IonIcons
            name="ios-search-outline"
            size={ICON_DEFAULT_SIZE}
            color={'gray'}
          />
          <TextInput
            placeholder="Search people for message..."
            placeholderTextColor={'#8b949e'}
            {...props}
            className={`${Styles.fonts.pr} flex-1 ml-2 ${
              theme.text__colors.tp
            } ${props.className ? props.className : ''}`}
          />
          {props.value && props.value.length > 0 && (
            <IonIcons
              name="close-outline"
              color={'gray'}
              size={ICON_DEFAULT_SIZE + 5}
              onPress={handleCutText}
            />
          )}
        </View>
      </View>
    </Container>
  );
};

export default SearchBarWithBackButton;
