import {View, ViewProps} from 'react-native';

import React from 'react';

interface PropType extends ViewProps {
  children: React.ReactNode;
}
const Container: React.FC<PropType> = ({children, ...props}) => {
  return (
    <View
      {...props}
      className={`py-2 px-4 ${props.className ? props.className : ''}`}>
      {children}
    </View>
  );
};

export default Container;
