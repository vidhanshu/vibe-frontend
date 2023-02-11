import {AntIcons, ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {
  ButtonLoading,
  Container,
  CustomeHeader,
  PasswordField,
} from '../../components';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ImageFileType, ScreenPropType, UserDataType} from '../../types';
import {
  LINEAR_GRADIENT_START_COLOR,
  LINEAR_GRADIENT_STOP_COLOR,
  Styles,
} from '../../styles';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {BLANK_PROFILE_IMG} from '../../config/constant';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SETTINGS_SCREEN} from '../../config/screens';
import {UpdateUserHandler} from '../../requests/handlers/Auth';
import {launchImageLibrary} from 'react-native-image-picker';

type UserUpdateType = UserDataType & {
  password?: string;
};
const EditProfile = ({navigation}: ScreenPropType) => {
  const data = useAppSelector(state => state.auth);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<UserUpdateType | null>(data.user);
  const [showPassword, setShowPassword] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const {theme, mode} = useAppSelector(state => state.theme);
  const [imageFile, setImageFile] = React.useState<ImageFileType | null>(null);

  const selectImage = React.useCallback(async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel) {
          if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            if (response.assets) {
              setImageFile({
                uri: response.assets[0].uri,
                type: response.assets[0].type,
                name: response.assets[0].fileName,
              });
            }
          }
        }
      },
    );
  }, []);

  return (
    <View className={`${theme.bg__colors.bp} flex-1`}>
      <CustomeHeader navigation={navigation}>
        <View className="items-center justify-between flex-row">
          <Text
            className={`${theme.text__colors.tp} ${Styles.fonts.pr} text-base`}>
            Edit Profile
          </Text>
          <IonIcons
            onPress={() => navigation.navigate(SETTINGS_SCREEN)}
            name="ios-settings-outline"
            size={ICON_DEFAULT_SIZE}
            color={mode === 'light' ? 'gray' : '#c9d1d9'}
          />
        </View>
      </CustomeHeader>
      <ScrollView className="flex-1">
        <Container>
          <LinearGradient
            colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}
            className="w-[85px] m-auto rounded-full p-[3px]">
            <Pressable
              onPress={selectImage}
              className="relative w-[80px] m-auto rounded-full">
              <FastImage
                className="w-20 h-20 rounded-full m-auto"
                source={{
                  uri: imageFile?.uri || user?.profile || BLANK_PROFILE_IMG,
                  headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                  },
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <AntIcons
                className="absolute right-0 bottom-0 bg-blue-600 rounded-full p-1"
                name="edit"
                color={'white'}
                size={ICON_DEFAULT_SIZE - 4}
              />
            </Pressable>
          </LinearGradient>
        </Container>
        <Container>
          <InputCustom label="username" setUser={setUser} user={user} />
          <InputCustom label="email" setUser={setUser} user={user} />
          <InputCustom label="name" setUser={setUser} user={user} />
          <InputCustom label="bio" setUser={setUser} user={user} />
          <InputCustom label="mobile" setUser={setUser} user={user} />
          <PasswordField
            value={user?.password || ''}
            onChangeText={text => {
              setUser({...user, password: text});
            }}
            setShowPassword={setShowPassword}
            showPassword={showPassword}
            shouldShowForgotPassword={false}
          />
          <ButtonLoading
            onPress={async () => {
              await UpdateUserHandler(
                token, //jwt
                user, //new user data
                dispatch, //to update state
                setLoading, //to set loading state
                data.user || ({} as UserDataType), //old user data
                imageFile || ({} as ImageFileType), //for profile image
              );
            }}
            className="mt-5"
            loading={loading}>
            Update
          </ButtonLoading>
        </Container>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

type InputCustomePropType = {
  user: UserDataType | null;
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  label: string;
};
const InputCustom = ({label, setUser, user}: InputCustomePropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View className="mb-5">
      <Text
        className={`px-1 ${Styles.fonts.pr} ${theme.text__colors.txt} text-xs`}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={'#8b949e'}
        value={user ? user[label] : ''}
        onChangeText={text => {
          setUser({...user, [label]: text});
        }}
        className={`py-1 ${Styles.fonts.pr} text-base ${theme.borders.bbt} ${theme.text__colors.tp}`}
        placeholder={label}
      />
    </View>
  );
};
