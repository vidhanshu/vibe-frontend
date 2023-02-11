import {Pressable, PressableProps, Text} from 'react-native';

import React from 'react';
import {useAppSelector} from '../hooks';
import {Styles} from '../styles';

type InfoLabelPropType = PressableProps & {
  icon: React.ReactNode;
  children: React.ReactNode;
};
const InfoLabel = ({icon, children, ...props}: InfoLabelPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const [show, setShow] = React.useState<boolean>(true);
  if (show === false) {
    return null;
  }
  return (
    <Pressable
      onPress={() => setShow(false)}
      {...props}
      className={`${
        theme.bg__colors.bgt
      } flex-row items-center z-10 top-5 right-5 absolute border-[1px] ${
        theme.border__colors.bt
      } rounded-md p-1 ${props.className ? props.className : ''}`}>
      {icon}
      <Text className={`${Styles.fonts.pr} ${theme.text__colors.tt}`}>
        {children}
      </Text>
    </Pressable>
  );
};

export default InfoLabel;
