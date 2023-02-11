import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import React from 'react';
import {useAppSelector} from '../hooks';

interface PropType extends TouchableOpacityProps {
  children: React.ReactNode;
  loading?: boolean;
}
const IconBtn: React.FC<PropType> = ({children, loading = false, ...props}) => {
  const theme = useAppSelector(state => state.theme.theme);
  return (
    <TouchableOpacity
      {...props}
      disabled={loading}
      className={`justify-center items-center ${
        theme.bg__colors.bgt
      } p-2 rounded-full w-12 h-12 ${props.className ? props.className : ''}`}>
      {loading ? <ActivityIndicator color={'white'} /> : children}
    </TouchableOpacity>
  );
};

export default IconBtn;
