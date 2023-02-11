import {
  ImageFileType,
  LoginDataType,
  SignUpDataType,
  UserDataType,
  UserDataTypeForUpdate,
} from '../../types';
import {LoginUser, LogoutUser, UpdateUser, createUser} from '../Auth';
import {login, logout} from '../../redux/reducers';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

export const SignUpUserHandler = async (
  data: SignUpDataType,
  dispatch: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  try {
    const res = await createUser(data);
    if (res.error) {
      throw new Error(res.code);
    }
    dispatch(login({user: res.data.data.user, token: res.data.data.token}));
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({data: res.data.data.user, token: res.data.data.token}),
    );
  } catch (error: any) {
    Alert.alert('Error', error.message, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  } finally {
    setLoading(false);
  }
};

export const LoginUserHandler = async (
  data: LoginDataType,
  dispatch: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setLoading(true);
  try {
    const res = await LoginUser(data);
    if (res.error) {
      throw new Error(res.code);
    }
    dispatch(login({user: res.data.data.user, token: res.data.data.token}));
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({data: res.data.data.user, token: res.data.data.token}),
    );
  } catch (error: any) {
    Alert.alert('Error', error.message, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
  setLoading(false);
};

/**
 * @description This function is used to logout the user from the app and remove the user data from the async storage
 * @author @vidhanshu
 * @param token {string | null}
 * @param dispatch {any}
 * @returns {Promise<void>}
 */
export const LogoutUserHandler = async (
  token: string,
  dispatch: any,
): Promise<void> => {
  try {
    const res = await LogoutUser(token);
    if (res.error) {
      if (res.code === 'You are not authorized') {
        dispatch(logout());
        await AsyncStorage.removeItem('user');
        return;
      }
      throw new Error(res.code);
    }
    dispatch(logout());
    await AsyncStorage.removeItem('user');
  } catch (error: any) {
    Alert.alert('Error', error.message, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
};

/**
 * @description This function is used to update the user data
 * @author @vidhanshu
 * @param token {string | null}
 * @param data {UserDataType}
 * @param dispatch {any}
 * @param setLoading {React.Dispatch<React.SetStateAction<boolean>>}
 * @param OldData {UserDataType}
 * @returns {Promise<void>}
 */
export const UpdateUserHandler = async (
  token: string | null,
  data: any,
  dispatch: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  OldData: UserDataType,
  imageFile: ImageFileType,
): Promise<void> => {
  setLoading(true);
  try {
    const dataToBeUpdated: UserDataTypeForUpdate = {id: OldData.id};
    if (imageFile && imageFile.uri?.includes('file://')) {
      dataToBeUpdated.profile = imageFile;
    }
    if (data.username !== OldData.username) {
      dataToBeUpdated.username = data.username;
    }
    if (data.email !== OldData.email) {
      dataToBeUpdated.email = data.email;
    }
    if (data.mobile !== OldData.mobile) {
      dataToBeUpdated.mobile = data.mobile;
    }
    if (data.name !== OldData.name) {
      dataToBeUpdated.name = data.name;
    }
    if (data.bio !== OldData.bio) {
      dataToBeUpdated.bio = data.bio;
    }
    if (data.password) {
      dataToBeUpdated.password = data.password;
    }

    const res = await UpdateUser(dataToBeUpdated, token);
    if (res.error) {
      throw new Error(res.code);
    } else {
      Alert.alert('Success', res.code, [
        {
          text: 'Ok',
          onPress: () => {},
        },
      ]);
    }
    //update the state
    dispatch(login({user: {...res.data.data, id: data.id}, token}));
    //update the async storage
    await AsyncStorage.setItem(
      'user',
      JSON.stringify({data: {...res.data.data, id: data.id}, token}),
    );
  } catch (error: any) {
    Alert.alert('Error', error.message, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
  setLoading(false);
};
