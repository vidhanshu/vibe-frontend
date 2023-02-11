import {Dimensions} from 'react-native';

export const APP_NAME = 'Vibe';

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USERNAME_REGEX = /[A-Za-z][A-Za-z0-9_]{7,29}$/;

export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
export const MOBILE_REGEX = /^[0-9]{10,15}$/;
export const BLANK_PROFILE_IMG =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7kom7as3uaWbmqe51s7GseiT_HCD5arEnoSviC4r5jA&s';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
