import {Container, CustomeHeader} from '../../components';
import {ICON_DEFAULT_SIZE, IonIcons, MIcons} from '../../config/icons';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks';

import NewSectionTitle from '../../components/NewSectionTitle';
import React from 'react';
import {ScreenPropType} from '../../types';
import {toggleTheme} from '../../redux/reducers';
import {Styles} from '../../styles';

const Settings = ({navigation}: ScreenPropType) => {
  const {mode, theme} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();
  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <CustomeHeader navigation={navigation} label="Settings" />
      <ScrollView className="flex-1">
        <Container className="py-0">
          <NewSectionTitle>Account Settings</NewSectionTitle>
        </Container>
        <Container className="py-0">
          <NewSectionTitle>Theme Settings</NewSectionTitle>
          <View className="flex-row gap-x-5 justify-center items-center">
            <TouchableOpacity
              onPress={() => {
                if (mode === 'light') {
                  dispatch(toggleTheme());
                }
              }}
              className={`flex-row rounded-sm justify-between items-center gap-x-2 ${theme.bg__colors.bgt} p-2`}>
              <View
                className={`${
                  mode === 'light' ? 'bg-slate-400' : 'bg-blue-500'
                } w-5 h-5 p-[3px] justify-center items-center rounded-full`}>
                <MIcons color="white" name="done" />
              </View>
              <Text
                className={`${Styles.fonts.pr} text-base ${
                  mode === 'light'
                    ? theme.text__colors.txt
                    : theme.text__colors.tp
                }`}>
                Dark
              </Text>
              <IonIcons
                color={mode === 'light' ? 'gray' : '#c9d1d9'}
                name="moon-outline"
                size={ICON_DEFAULT_SIZE - 2}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (mode === 'dark') {
                  dispatch(toggleTheme());
                }
              }}
              className={`flex-row gap-x-2 ${theme.bg__colors.bgt} p-2`}>
              <View
                className={`${
                  mode === 'dark' ? 'bg-slate-400' : 'bg-blue-500'
                } w-5 h-5 p-[3px] justify-center items-center rounded-full`}>
                <MIcons color="white" name="done" />
              </View>
              <Text
                className={`${Styles.fonts.pr} text-base ${
                  mode === 'light'
                    ? theme.text__colors.tp
                    : theme.text__colors.txt
                }`}>
                Light
              </Text>
              <IonIcons
                color={mode === 'light' ? 'gray' : '#c9d1d9'}
                name="sunny-outline"
                size={ICON_DEFAULT_SIZE}
              />
            </TouchableOpacity>
          </View>
        </Container>
      </ScrollView>
    </View>
  );
};

export default Settings;
