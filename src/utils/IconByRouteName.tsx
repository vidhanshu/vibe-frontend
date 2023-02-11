import {
  ADD_POST_SCREEN,
  HOME_SCREEN,
  NOTIFICATIONS_SCREEN,
  PROFILE_SCREEN,
  SEARCH_SCREEN,
} from '../config/screens';
import {ICON_DEFAULT_SIZE, IonIcons} from '../config/icons';
import {Image, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {
  LINEAR_GRADIENT_START_COLOR,
  LINEAR_GRADIENT_STOP_COLOR,
} from '../styles';

import {BLANK_PROFILE_IMG} from '../config/constant';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {useAppSelector} from '../hooks';

interface IconByRouteNamePropsType extends TouchableOpacityProps {
  routeName: string;
  isFocused: boolean;
}
const IconByRouteName: React.FC<IconByRouteNamePropsType> = ({
  routeName,
  isFocused,
  ...props
}) => {
  const {theme} = useAppSelector(state => state.theme);
  const profile = useAppSelector(state => state.auth.user?.profile);
  switch (routeName) {
    case HOME_SCREEN:
      return (
        <TouchableOpacity {...props}>
          <IonIcons
            name={isFocused ? 'ios-home' : 'ios-home-outline'}
            size={ICON_DEFAULT_SIZE}
            color={theme.icon__colors.ip}
          />
        </TouchableOpacity>
      );
    case PROFILE_SCREEN:
      return (
        <TouchableOpacity {...props}>
          <LinearGradient
            colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}
            className={`p-[${isFocused ? '2px' : 0}] rounded-full`}>
            <Image
              className="w-[22px] h-[22px] rounded-full"
              source={{
                uri: profile || BLANK_PROFILE_IMG,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
      );
    case SEARCH_SCREEN:
      return (
        <TouchableOpacity {...props}>
          <IonIcons
            name={isFocused ? 'md-search-sharp' : 'search-outline'}
            size={ICON_DEFAULT_SIZE}
            color={theme.icon__colors.ip}
          />
        </TouchableOpacity>
      );
    case ADD_POST_SCREEN:
      return (
        <TouchableOpacity
          {...props}
          className="bg-blue-500 p-3 shadow-md shadow-blue-600 rounded-full mt-[-30]">
          <IonIcons name={'ios-add'} size={ICON_DEFAULT_SIZE} color={'white'} />
        </TouchableOpacity>
      );
    case NOTIFICATIONS_SCREEN:
      return (
        <TouchableOpacity {...props}>
          <IonIcons
            name={
              isFocused
                ? 'ios-notifications-sharp'
                : 'ios-notifications-outline'
            }
            size={ICON_DEFAULT_SIZE}
            color={theme.icon__colors.ip}
          />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

export default IconByRouteName;
