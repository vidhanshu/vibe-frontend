import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {
  ButtonLoading,
  CustomeHeader,
  InfoLabel,
  PostCard,
} from '../../components';
import {DeletePostHandler, UpdateCaptionHandler} from '../../requests';
import {ICON_DEFAULT_SIZE, IonIcons, MCIcons, MIcons} from '../../config/icons';
import {Post1, PostOptionType, ScreenPropType} from '../../types';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';

import IconBtn from '../../components/IconBtn';
import ImageViewer from 'react-native-image-zoom-viewer';
import {setPosts} from '../../redux/reducers';

const SinglePost = ({navigation, route}: ScreenPropType) => {
  const data: Post1 = route.params;
  const [showImg, setShowImg] = React.useState<boolean>(false);
  const {theme, mode} = useAppSelector(state => state.theme);
  const token = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);
  const {posts} = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const options: PostOptionType[] = [
    {
      name: 'Report',
      icon: (
        <MIcons name="report" color={theme.colors.s} size={ICON_DEFAULT_SIZE} />
      ),
      action: () => {},
    },
    {
      name: 'Share',
      icon: (
        <MIcons name="share" color={theme.colors.s} size={ICON_DEFAULT_SIZE} />
      ),
      action: () => {},
    },
    {
      name: 'Copy Link',
      icon: (
        <MIcons
          name="file-copy"
          color={theme.colors.s}
          size={ICON_DEFAULT_SIZE}
        />
      ),
      action: () => {
        ToastAndroid.show('Link Copied', ToastAndroid.SHORT);
      },
    },
    {
      name: 'Unfollow',
      icon: (
        <MIcons
          name="account-circle"
          color={theme.colors.s}
          size={ICON_DEFAULT_SIZE}
        />
      ),
      action: () => {},
    },
    {
      name: 'Delete post',
      icon: (
        <IonIcons
          name="trash-outline"
          color={theme.colors.s}
          size={ICON_DEFAULT_SIZE}
        />
      ),
      action: async (id?: number) => {
        Alert.alert('Are you sure?', 'This process is irreversible', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: async () => {
              await DeletePostHandler(id || 0, token);
            },
          },
        ]);
      },
    },
    {
      name: 'Edit post',
      icon: (
        <MIcons name="edit" color={theme.colors.s} size={ICON_DEFAULT_SIZE} />
      ),
      action: (id?: number, dd?: any) => {
        openEditPost();
        const caption: string = dd.caption || '';
        setUpdatedCaption(caption);
      },
    },
  ];

  //bottom sheet and updating stuff
  //backdrop , bottomsheet and updating caption stuff

  //loading
  const [loading, setLoading] = useState<boolean>(false);
  //updated caption
  const [updated_caption, setUpdatedCaption] = useState<string>('');
  //index
  const [index, setIndex] = useState<number>(-1);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const openEditPost = () => {
    setIndex(1);
  };

  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <CustomeHeader navigation={navigation} label="Post" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <PostCard
          data={data}
          onImagePress={() => setShowImg(true)}
          navigation={navigation}
          options={
            data.user_id === user?.id
              ? options.filter(
                  i => i.name !== 'Unfollow' && i.name !== 'Report',
                )
              : options.filter(
                  i => i.name !== 'Delete post' && i.name !== 'Edit post',
                )
          }
          shouldShowTopBorder={false}
          shouldShowCollapsableCaption={false}
          InfoLable={
            <InfoLabel
              icon={
                <MCIcons
                  className="rounded-md"
                  name="gesture-tap"
                  size={ICON_DEFAULT_SIZE}
                  color={mode === 'light' ? '#44484e' : '#8b949e'}
                />
              }>
              Click on image to view
            </InfoLabel>
          }
        />
      </ScrollView>
      {showImg && (
        <Modal className="relative">
          <InfoLabel
            icon={
              <MCIcons
                className="rounded-md"
                name="gesture-swipe-down"
                size={ICON_DEFAULT_SIZE}
                color={mode === 'light' ? '#44484e' : '#8b949e'}
              />
            }>
            Swipe down to close
          </InfoLabel>
          <ImageViewer
            imageUrls={[
              {
                url: data.image,
              },
            ]}
            enableSwipeDown
            onSwipeDown={() => setShowImg(false)}
            useNativeDriver
            failImageSource={require('../../assets/images/skeleton.png')}
            backgroundColor={mode === 'light' ? 'white' : 'black'}
            renderIndicator={() => <Text />}
            renderHeader={() => (
              <IconBtn
                onPress={() => setShowImg(false)}
                className={`z-10 ${theme.bg__colors.bgt} absolute bottom-20 left-[44%]`}>
                <IonIcons
                  name="close-outline"
                  size={ICON_DEFAULT_SIZE}
                  color={mode === 'light' ? 'black' : '#8b949e'}
                />
              </IconBtn>
            )}
          />
        </Modal>
      )}
      <BottomSheet
        backgroundStyle={{
          backgroundColor: theme.colors.p,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.s,
        }}
        enablePanDownToClose
        onClose={() => setIndex(-1)}
        style={styles.container}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent">
        <BottomSheetTextInput
          style={[
            styles.input,
            {
              color: theme.colors.s,
            },
          ]}
          placeholder="Updated Caption.."
          value={updated_caption}
          onChangeText={text => setUpdatedCaption(text)}
        />
        <ButtonLoading
          className="h-12"
          onPress={async () => {
            const res = await UpdateCaptionHandler(
              data.id,
              updated_caption,
              token || '',
              setLoading,
            );
            if (res) {
              dispatch(
                setPosts(
                  posts.map(item => {
                    return {
                      ...item,
                      caption: updated_caption,
                    };
                  }),
                ),
              );
            }
            setIndex(-1);
            setUpdatedCaption(updated_caption);
          }}
          loading={loading}>
          Update
        </ButtonLoading>
      </BottomSheet>
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: 'black',
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 9,
    padding: 10,
    height: 45,
  },
});
