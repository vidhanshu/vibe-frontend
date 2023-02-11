import {Text, View, ViewProps} from 'react-native';

import React from 'react';
import {useAppSelector} from '../hooks';
import {Styles} from '../styles';

interface NewSectionTitle extends ViewProps {
  children: string;
}
const NewSectionTitle = ({children, ...props}: NewSectionTitle) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View
      {...props}
      className={`my-5 flex-row gap-x-6 items-center ${
        props.className ? props.className : ''
      }`}>
      <View className={`h-[1px] ${theme.bg__colors.bgxt} flex-1`} />
      <Text className={`${Styles.fonts.pm} text-sm ${theme.text__colors.tt}`}>
        {children}
      </Text>
      <View className={`h-[1px] ${theme.bg__colors.bgxt} flex-1`} />
    </View>
  );
};

export default NewSectionTitle;
