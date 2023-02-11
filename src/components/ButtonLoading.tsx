import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import React from 'react';
import {Styles} from '../styles';

type ButtonLoadingPropType = TouchableOpacityProps & {
  loading: boolean;
  children: React.ReactNode;
};
const ButtonLoading = ({
  loading,
  children,
  ...props
}: ButtonLoadingPropType) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={loading || props.disabled}
      className={`rounded-md ${
        loading || props.disabled ? 'bg-gray-500' : 'bg-blue-600'
      } p-3 mb-3 ${props.className ? props.className : ''}`}>
      {loading ? (
        <ActivityIndicator
          className="my-[2px]"
          size={'small'}
          color={'white'}
        />
      ) : (
        <Text className={`${Styles.fonts.pm} text-base text-white text-center`}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonLoading;
