import {
  AntIcons,
  ICON_DEFAULT_SIZE,
  IonIcons,
  MCIcons,
} from '../../config/icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';

import Container from '../Container';
import {EDIT_PROFILE_SCREEN} from '../../config/screens';
import IconBtn from '../IconBtn';
import {LogoutUserHandler} from '../../requests/handlers/Auth';
import React from 'react';
import {Styles} from '../../styles';

interface ProfilePropType {
  navigation: any;
}
const ProfileTop = ({navigation}: ProfilePropType) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  return (
    <View className="relative">
      <Image
        className="w-screen h-52"
        source={{
          uri: 'https://i.ytimg.com/vi/b3bFi7ooyfY/maxresdefault.jpg',
        }}
      />
      <Container className="w-full absolute top-0 flex-row left-0 right-0 justify-between">
        <IconBtn onPress={() => navigation.goBack()}>
          <AntIcons
            name="left"
            size={ICON_DEFAULT_SIZE}
            color={theme.icon__colors.ip}
          />
        </IconBtn>
        <View className="relative">
          <IconBtn
            onPress={() => {
              setShowMenu(!showMenu);
            }}>
            <IonIcons
              color={theme.icon__colors.ip}
              name="ellipsis-vertical"
              size={ICON_DEFAULT_SIZE}
            />
          </IconBtn>
          {showMenu ? (
            <View
              className={`rounded-md shadow-lg p-1 ${theme.bg__colors.bp} border-[1px] ${theme.border__colors.bt} absolute top-[115%] z-10 w-52 right-0 gap-y-2`}>
              {[
                {
                  name: 'Edit profile',
                  icon: 'account-edit-outline',
                },
                {
                  name: 'Logout',
                  icon: 'logout-variant',
                },
              ].map((item, index) => (
                <TouchableOpacity
                  onPress={async () => {
                    setShowMenu(false);
                    await callByScreen({
                      dispatch,
                      screen: item.name.toLowerCase(),
                      token,
                      navigation,
                    });
                  }}
                  key={index}
                  className={`p-2 ${theme.bg__colors.bgt} rounded-md flex-row`}>
                  <MCIcons
                    name={item.icon}
                    size={ICON_DEFAULT_SIZE}
                    color={mode === 'light' ? 'gray' : '#c9d1d9'}
                  />
                  <Text
                    className={`ml-2 ${Styles.fonts.pm} ${theme.text__colors.tp}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
        </View>
      </Container>
    </View>
  );
};

export default ProfileTop;

type CallByScreenTypes = {
  screen: string;
  dispatch: (state: any) => void;
  token?: string | null;
  navigation?: any;
};
const callByScreen = async ({
  dispatch,
  screen,
  token,
  navigation,
}: CallByScreenTypes) => {
  switch (screen) {
    case 'logout':
      LogoutUserHandler(token || '', dispatch);
      break;
    case 'edit profile':
      navigation.navigate(EDIT_PROFILE_SCREEN);
      break;
    default:
  }
};
