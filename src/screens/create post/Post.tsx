import {BLANK_PROFILE_IMG, SCREEN_WIDTH} from '../../config/constant';
import {ButtonLoading, Container} from '../../components';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ImageFileType, ScreenPropType} from '../../types';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {CreatePostHandler} from '../../requests';
import {HOME_SCREEN} from '../../config/screens';
import IconBtn from '../../components/IconBtn';
import React from 'react';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

const Post = ({navigation}: ScreenPropType) => {
  const {theme, mode} = useAppSelector(state => state.theme);
  const [imageFile, setImageFile] = React.useState<ImageFileType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const data = useAppSelector(state => state.auth);
  const [caption, setCaption] = React.useState<string>('');

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
    await launchCamera({mediaType: 'photo', quality: 1}, response => {
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
    <ScrollView className={`flex-1 ${theme.bg__colors.bp}`}>
      <Container className="flex-row items-center gap-x-2">
        <Image
          source={{uri: data.user?.profile || BLANK_PROFILE_IMG}}
          className="w-10 h-10 rounded-full"
        />
        <View>
          <Text
            className={`${Styles.fonts.pm} text-base ${theme.text__colors.tp}`}>
            {data.user?.name}
          </Text>
        </View>
      </Container>
      <View
        className={`mb-3 p-1 ${theme.bg__colors.bgt}  ${theme.borders.bbt}`}>
        <TextInput
          placeholderTextColor={'#8b949e'}
          placeholder="Write caption here..."
          multiline={true}
          onChangeText={text => {
            if (caption.length <= 900) {
              setCaption(text);
            } else {
              setCaption(text.slice(0, 900));
            }
          }}
          value={caption}
          className={` ${Styles.fonts.pr} ${theme.text__colors.tp}`}
        />
      </View>
      <Container className="pt-0">
        <Text
          className={`text-right ${Styles.fonts.pm} text-xs ${theme.text__colors.txt}`}>
          <Text className={`${caption.length >= 900 && 'text-red-600'}`}>
            {caption.length}
          </Text>
          /900
        </Text>
      </Container>
      <View className="py-2">
        <Pressable onPress={() => {}} className="relative">
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
            const res = await CreatePostHandler({
              token: data.token,
              caption,
              image: imageFile,
              setLoading,
            });
            setCaption('');
            setImageFile(null);
            navigation.navigate(HOME_SCREEN, res);
          }}
          disabled={caption.length < 10 || !imageFile}
          loading={loading}>
          Post
        </ButtonLoading>
      </Container>
    </ScrollView>
  );
};

export default Post;

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
