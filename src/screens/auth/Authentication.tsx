import {AntIcons, MIcons} from '../../config/icons';
import {ButtonLoading, Container, PasswordField} from '../../components';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {LoginDataType, SignUpDataType} from '../../types';
import {LoginUserHandler, SignUpUserHandler} from '../../requests';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {ICON_DEFAULT_SIZE} from '../../config/icons';
import NewSectionTitle from '../../components/NewSectionTitle';
import React from 'react';
import {Styles} from '../../styles';

const Authentication = () => {
  const [signIn, setSignIn] = React.useState<boolean>(true);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginDetails, setLoginDetails] = React.useState<LoginDataType>({
    email: '',
    password: '',
  });
  const [signUpDetails, setSignUpDetails] = React.useState<SignUpDataType>({
    email: '',
    password: '',
    username: '',
  });

  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.theme);

  return (
    <ScrollView className={`flex-1 ${theme.bg__colors.bp}`}>
      <View className="h-36 w-full justify-center items-center">
        <Image
          className="w-20 h-20 mt-3"
          resizeMode="contain"
          source={
            signIn
              ? require('../../assets/images/logo.png')
              : require('../../assets/images/logo.png')
          }
        />
      </View>
      <Container className="p-7 pt-4 gap-y-2">
        <Text
          className={`${Styles.fonts.pm} mb-2 text-xl ${theme.text__colors.tp}`}>
          {signIn ? 'Login' : 'SignUp'}
        </Text>

        {!signIn ? <SocialLogin /> : null}

        {!signIn ? <NewSectionTitle>Or Signup with</NewSectionTitle> : null}

        {signIn ? (
          <SignInForm
            loginDetails={loginDetails}
            setLoginDetails={setLoginDetails}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <SignUpForm
            signUpDetails={signUpDetails}
            setSignUpDetails={setSignUpDetails}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}

        {signIn ? (
          <ButtonLoading
            loading={loading}
            onPress={async () =>
              await LoginUserHandler(loginDetails, dispatch, setLoading)
            }>
            Login
          </ButtonLoading>
        ) : (
          <ButtonLoading
            loading={loading}
            onPress={async () =>
              await SignUpUserHandler(signUpDetails, dispatch, setLoading)
            }>
            Sign up
          </ButtonLoading>
        )}

        {signIn ? <NewSectionTitle>Or login with</NewSectionTitle> : null}

        {signIn ? <SocialLogin /> : null}

        {signIn ? (
          <Text
            className={`${Styles.fonts.pm} text-center ${theme.text__colors.tt}`}>
            New to Vibe?{'  '}
            <Text
              className={`${Styles.fonts.pm} text-blue-500`}
              onPress={() => setSignIn(false)}>
              Register
            </Text>
          </Text>
        ) : (
          <Text
            className={`${Styles.fonts.pm} text-center ${theme.text__colors.tt}`}>
            Already on Vibe?{'  '}
            <Text
              className={`${Styles.fonts.pm} text-blue-500`}
              onPress={() => setSignIn(true)}>
              Login
            </Text>
          </Text>
        )}
      </Container>
    </ScrollView>
  );
};

export default Authentication;

interface SignInFormPropType {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  loginDetails: LoginDataType;
  setLoginDetails: (value: LoginDataType) => void;
}

const SignInForm = ({
  showPassword,
  setShowPassword,
  loginDetails,
  setLoginDetails,
}: SignInFormPropType) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  return (
    <View className="my-3">
      <View
        className={`flex-row gap-x-2 mb-3 items-center ${theme.borders.bbt}`}>
        <MIcons
          color={mode === 'light' ? 'gray' : '#c9d1d9'}
          name="alternate-email"
          size={ICON_DEFAULT_SIZE}
        />
        <TextInput
          value={loginDetails.email}
          onChangeText={text =>
            setLoginDetails({...loginDetails, email: text.trim()})
          }
          placeholderTextColor={'#8b949e'}
          className={`${Styles.fonts.pr} text-base flex-1 ${theme.text__colors.tp}`}
          placeholder="Email ID or Username"
        />
      </View>
      <PasswordField
        value={loginDetails.password}
        onChangeText={text =>
          setLoginDetails({...loginDetails, password: text.trim()})
        }
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </View>
  );
};
interface SignUpFormPropType {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  signUpDetails: SignUpDataType;
  setSignUpDetails: (value: SignUpDataType) => void;
}
const SignUpForm = ({
  showPassword,
  setShowPassword,
  setSignUpDetails,
  signUpDetails,
}: SignUpFormPropType) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  return (
    <View className="mb-3">
      <View className={`flex-row gap-x-2 items-center ${theme.borders.bbt}`}>
        <AntIcons
          color={mode === 'light' ? 'gray' : '#c9d1d9'}
          name="user"
          size={ICON_DEFAULT_SIZE}
        />
        <TextInput
          value={signUpDetails.username}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, username: text.trim()})
          }
          placeholderTextColor={'#8b949e'}
          className={`${Styles.fonts.pr} text-base flex-1 ${theme.text__colors.tp}`}
          placeholder="Username"
        />
      </View>
      <View
        className={`flex-row my-3 gap-x-2 items-center ${theme.borders.bbt}`}>
        <MIcons
          color={mode === 'light' ? 'gray' : '#c9d1d9'}
          name="alternate-email"
          size={ICON_DEFAULT_SIZE}
        />
        <TextInput
          value={signUpDetails.email}
          onChangeText={text =>
            setSignUpDetails({...signUpDetails, email: text.trim()})
          }
          placeholderTextColor={'#8b949e'}
          className={`${Styles.fonts.pr} text-base flex-1 ${theme.text__colors.tp}`}
          placeholder="Email ID"
        />
      </View>
      <PasswordField
        value={signUpDetails.password}
        onChangeText={text =>
          setSignUpDetails({...signUpDetails, password: text.trim()})
        }
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        shouldShowForgotPassword={false}
      />
    </View>
  );
};
const SocialLogin = () => {
  const {theme, mode} = useAppSelector(state => state.theme);
  return (
    <View className="flex-row justify-between gap-x-5 my-3">
      <TouchableOpacity
        className={`justify-center items-center flex-1 px-3 py-2 border-[1px] ${theme.bg__colors.bgt} border-[1px] ${theme.border__colors.bt} rounded-md`}>
        <Image
          className="w-10 h-10"
          source={require('../../assets/images/google.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className={`justify-center items-center flex-1 px-3 py-2 border-[1px] ${theme.bg__colors.bgt} border-[1px] ${theme.border__colors.bt} rounded-md`}>
        <Image
          className="w-8 h-8"
          source={require('../../assets/images/facebook.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        className={`justify-center items-center flex-1 px-3 py-2 border-[1px] ${theme.bg__colors.bgt} border-[1px] ${theme.border__colors.bt} rounded-md`}>
        <Image
          className="w-8 h-8 rounded-full"
          source={
            mode === 'light'
              ? require('../../assets/images/github.png')
              : require('../../assets/images/git_dark.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};
