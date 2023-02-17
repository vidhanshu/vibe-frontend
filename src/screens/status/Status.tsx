/* eslint-disable react-native/no-inline-styles */

import {
  Alert,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomeHeader, InfoLabel, ProgressBar} from '../../components';
import {HOME_SCREEN, PROFILE_SCREEN} from '../../config/screens';
import {ICON_DEFAULT_SIZE, IonIcons, MCIcons} from '../../config';
import {
  LINEAR_GRADIENT_START_COLOR,
  LINEAR_GRADIENT_STOP_COLOR,
  Styles,
} from '../../styles';
import {ScreenPropType, StatusType} from '../../types';

import IconBtn from '../../components/IconBtn';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SCREEN_WIDTH} from '../../config/constant';
import {StatusDeleteHandler} from '../../requests/handlers/Status';
import {getTimeDifference} from '../../utils';
import {useAppSelector} from '../../hooks';

const Status = ({navigation, route}: ScreenPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const id = useAppSelector(state => state.auth.user?.id);
  const token = useAppSelector(state => state.auth.token);
  const [showImg, setShowImg] = React.useState<boolean>(false);

  const {createdAt, name, profile, status, user_id}: StatusType = route.params;
  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <CustomeHeader navigation={navigation}>
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => navigation.navigate(PROFILE_SCREEN)}
            className="flex-row items-center  gap-x-5">
            <Image
              className="w-7 h-7 rounded-full"
              source={{
                uri: profile,
              }}
            />
            <View>
              <Text
                className={`text-sm ${Styles.fonts.pm} ${theme.text__colors.tp}`}>
                {name}
              </Text>
              <Text
                className={`text-xs ${Styles.fonts.pr} ${theme.text__colors.tt}`}>
                {getTimeDifference(createdAt)}
              </Text>
            </View>
          </TouchableOpacity>
          {id === user_id && (
            <IconBtn
              onPress={async () => {
                Alert.alert(
                  'Are you sure?',
                  'You want to delete this status?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: async () => {
                        await StatusDeleteHandler(token);
                        navigation.navigate(HOME_SCREEN, {
                          removeStatus: user_id,
                        });
                      },
                    },
                  ],
                );
              }}>
              <IonIcons
                name={'ios-trash'}
                size={ICON_DEFAULT_SIZE}
                color={theme.colors.s}
              />
            </IconBtn>
          )}
        </View>
      </CustomeHeader>

      <LinearGradient
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}>
        <Pressable className="w-screen" onPress={() => setShowImg(true)}>
          <Image
            source={{
              uri: status,
            }}
            className="w-full"
            style={{
              height: SCREEN_WIDTH,
            }}
          />
        </Pressable>
      </LinearGradient>

      {showImg && (
        <Modal className={`relative ${theme.bg__colors.bp}`}>
          <InfoLabel
            icon={
              <MCIcons
                className="rounded-md"
                name="gesture-swipe-down"
                size={ICON_DEFAULT_SIZE}
                color={theme.colors.s}
              />
            }>
            Swipe down to close
          </InfoLabel>
          <ImageViewer
            imageUrls={[
              {
                url: status,
              },
            ]}
            enableSwipeDown
            onSwipeDown={() => setShowImg(false)}
            useNativeDriver
            failImageSource={require('../../assets/images/skeleton.png')}
            backgroundColor={theme.colors.s}
            renderIndicator={() => <Text />}
            renderHeader={() => (
              <IconBtn
                onPress={() => setShowImg(false)}
                className={`z-10 ${theme.bg__colors.bgt} absolute bottom-20 left-[44%]`}>
                <IonIcons
                  name="close-outline"
                  size={ICON_DEFAULT_SIZE}
                  color={theme.colors.s}
                />
              </IconBtn>
            )}
          />
        </Modal>
      )}
    </View>
  );
};

export default Status;
