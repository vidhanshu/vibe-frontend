import {Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';

import React from 'react';
import {useAppSelector} from '../hooks';
import {Styles} from '../styles';

interface CustomeButtonPropType extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const CustomeButton = ({
  children,
  variant = 'primary',
  ...props
}: CustomeButtonPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      {...props}
      className={`${
        variant === 'primary'
          ? 'bg-[#843cf9] p-4 rounded-full flex-1 max-w-[140px]'
          : `${theme.bg__colors.bgt} p-4 rounded-full flex-1 max-w-[140px]`
      }`}>
      <Text
        className={
          variant === 'primary'
            ? `text-white ${Styles.fonts.pm} text-base text-center`
            : `text-[#843cf9] ${Styles.fonts.pm} text-base text-center`
        }>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;
