import {ButtonLoading, Container, CustomeHeader} from '../../components';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config';
import {Image, PermissionsAndroid, Pressable, View} from 'react-native';
import {ImageFileType, ScreenPropType} from '../../types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {HOME_SCREEN} from '../../config/screens';
import IconBtn from '../../components/IconBtn';
import React from 'react';
import {SCREEN_WIDTH} from '../../config/constant';
import {addStatusHandler} from '../../requests/handlers/Status';
import {useAppSelector} from '../../hooks';

const AddStatus = ({navigation}: ScreenPropType) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  const {auth} = useAppSelector(state => state);
  const [imageFile, setImageFile] = React.useState<ImageFileType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const selectImage = React.useCallback(async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        if (!response.didCancel) {
          if (response.errorCode) {
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

  const ClickImage = React.useCallback(async () => {
    await requestCameraPermission();
    await launchCamera({mediaType: 'photo'}, response => {
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
    });
  }, []);
  const DiscardImage = React.useCallback(() => {
    setImageFile(null);
  }, []);
  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <CustomeHeader
        rightArrow={true}
        leftArrow={false}
        label="Add status"
        navigation={navigation}
      />
      <View className="flex-1 justify-center">
        <View className="py-2">
          <Pressable className="relative">
            <Image
              source={
                imageFile?.uri
                  ? {uri: imageFile.uri}
                  : require('../../assets/images/default_post.jpg')
              }
              className="w-full"
              style={{
                height: SCREEN_WIDTH,
              }}
            />
            <IconBtn onPress={ClickImage} className="absolute bottom-4 left-4">
              <IonIcons
                name="ios-camera"
                size={ICON_DEFAULT_SIZE}
                color={mode === 'light' ? 'black' : 'white'}
              />
            </IconBtn>
            <IconBtn
              onPress={imageFile ? DiscardImage : selectImage}
              className="absolute bottom-4 right-4">
              <IonIcons
                name={imageFile ? 'ios-trash' : 'ios-images'}
                size={ICON_DEFAULT_SIZE}
                color={mode === 'light' ? 'black' : 'white'}
              />
            </IconBtn>
          </Pressable>
        </View>
        <Container>
          <ButtonLoading
            onPress={async () => {
              setLoading(true);
              await addStatusHandler({
                image: imageFile,
                token: auth.token || '',
              });
              setImageFile(null);
              setLoading(false);
              navigation.navigate(HOME_SCREEN, {statusData: Date.now()});
            }}
            disabled={!imageFile}
            loading={loading}>
            Add Status
          </ButtonLoading>
        </Container>
      </View>
    </View>
  );
};

export default AddStatus;

async function requestCameraPermission() {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Vibe Camera Permission',
      message:
        'Vibe needs access to your camera ' +
        'so you can take awesome pictures.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
  } catch (err) {
    console.warn(err);
  }
}
