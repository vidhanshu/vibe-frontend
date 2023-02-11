import {Keyboard, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Container from './Container';
import {IconByRouteName} from '../utils';
import React from 'react';
import {useAppSelector} from '../hooks';

const BottomNavigationTabs = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const theme = useAppSelector(s => s.theme.theme);
  //logic to hide bottom tab bar when keyboard is open
  const [keyboardStatus, setKeyboardStatus] = React.useState<boolean>();

  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (keyboardStatus) {
    return <View />;
  }

  return (
    <Container
      className={`relative h-14 ${theme.bg__colors.bp} flex-row justify-between items-center border-t-[1px] ${theme.border__colors.bt}`}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route?.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <IconByRouteName
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            routeName={route.name}
            isFocused={isFocused}
          />
        );
      })}
    </Container>
  );
};
export default BottomNavigationTabs;
