import {AntIcons, ICON_DEFAULT_SIZE} from '../config/icons';
import {Text, View} from 'react-native';

import Container from './Container';
import React from 'react';
import {Styles} from '../styles';
import {useAppSelector} from '../hooks';

type CustomeHeaderPropTypes = {
  children?: React.ReactNode;
  navigation: any;
  label?: string;
  leftArrow?: boolean;
  rightArrow?: boolean;
};
const CustomeHeader = ({
  navigation,
  label,
  children,
  leftArrow = true,
  rightArrow = false,
}: CustomeHeaderPropTypes) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <Container
      className={`flex-row items-center gap-x-6 py-4 ${theme.bg__colors.bp} ${theme.borders.bbt}`}>
      {leftArrow && (
        <AntIcons
          onPress={() => navigation.goBack()}
          name="left"
          size={ICON_DEFAULT_SIZE}
          color={theme.colors.s}
        />
      )}
      <View className="flex-1">
        {children ? (
          children
        ) : (
          <>
            {label ? (
              <Text
                className={`${Styles.fonts.pm} ${theme.text__colors.tt} text-lg`}>
                {label}
              </Text>
            ) : null}
          </>
        )}
      </View>
      {rightArrow && (
        <AntIcons
          onPress={() => navigation.goBack()}
          name="right"
          size={ICON_DEFAULT_SIZE}
          color={theme.colors.s}
        />
      )}
    </Container>
  );
};

export default CustomeHeader;
