import {AntIcons, ICON_DEFAULT_SIZE, IonIcons} from '../config/icons';
import {Text, TextInput, TextInputProps, View} from 'react-native';

import React from 'react';
import {useAppSelector} from '../hooks';
import {Styles} from '../styles';

type PasswordFieldProps = TextInputProps & {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  shouldShowForgotPassword?: boolean;
};
const PasswordField = ({
  showPassword,
  setShowPassword,
  shouldShowForgotPassword = true,
  ...props
}: PasswordFieldProps) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  return (
    <View className={`flex-row gap-x-2 items-center ${theme.borders.bbt}`}>
      <AntIcons
        name="lock"
        size={ICON_DEFAULT_SIZE}
        color={mode === 'light' ? 'gray' : '#c9d1d9'}
      />
      <TextInput
        {...props}
        placeholderTextColor={'#8b949e'}
        secureTextEntry={showPassword ? false : true}
        className={`${Styles.fonts.pr} text-base flex-1 ${theme.text__colors.tp}`}
        placeholder="Password"
      />
      {showPassword ? (
        <IonIcons
          name="eye-outline"
          color={mode === 'light' ? 'gray' : '#c9d1d9'}
          size={ICON_DEFAULT_SIZE}
          onPress={() => setShowPassword(false)}
        />
      ) : (
        <IonIcons
          name="eye-off-outline"
          color={mode === 'light' ? 'gray' : '#c9d1d9'}
          size={ICON_DEFAULT_SIZE}
          onPress={() => setShowPassword(true)}
        />
      )}
      {shouldShowForgotPassword ? (
        <Text className={`${Styles.fonts.pm} text-blue-500`}>Forgot?</Text>
      ) : null}
    </View>
  );
};

export default PasswordField;
