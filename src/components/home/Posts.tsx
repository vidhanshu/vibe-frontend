import {ADD_POST_SCREEN, SIGNLE_POST_SCREEN} from '../../config/screens';
import {Alert, Text, ToastAndroid, View} from 'react-native';
import {ICON_DEFAULT_SIZE, IonIcons, MIcons} from '../../config/icons';
import {PostOptionType, ScreenPropType, UpdateCaptionType} from '../../types';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {DeletePostHandler} from '../../requests';
import PostCard from '../PostCard';
import React from 'react';
import {Styles} from '../../styles';
import {setPosts} from '../../redux/reducers';

type PropType = {
  navigation: ScreenPropType['navigation'];
  setUpdatedCaption: React.Dispatch<React.SetStateAction<UpdateCaptionType>>;
  openEditPost: () => void;
};
const Posts = ({navigation, setUpdatedCaption, openEditPost}: PropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const user = useAppSelector(state => state.auth.user);
  const token = useAppSelector(state => state.auth.token);
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
      name: 'Go To Post',
      icon: (
        <MIcons
          name="local-post-office"
          color={theme.colors.s}
          size={ICON_DEFAULT_SIZE}
        />
      ),
      action: () => {
        navigation.navigate(SIGNLE_POST_SCREEN, posts[0]);
      },
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
              dispatch(setPosts(posts.filter(i => i.id !== id)));
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
        const _id: number = dd.id || 0;
        const caption: string = dd.caption || '';
        setUpdatedCaption({
          post_id: _id,
          caption,
        });
      },
    },
  ];
  return (
    <View className="flex-1">
      {posts.length > 0 ? (
        posts.map((item, index) => (
          <PostCard
            onImagePress={() => {
              navigation.navigate(SIGNLE_POST_SCREEN, item);
            }}
            shouldShowCollapsableCaption={true}
            navigation={navigation}
            key={index}
            data={item}
            options={
              item.user_id === user?.id
                ? options.filter(
                    i => i.name !== 'Unfollow' && i.name !== 'Report',
                  )
                : options.filter(
                    i => i.name !== 'Delete post' && i.name !== 'Edit post',
                  )
            }
          />
        ))
      ) : (
        <View
          className={`flex-1 border-2 mt-5 ${theme.bg__colors.bp} justify-center items-center`}>
          <Text
            className={`${theme.text__colors.tp} text-lg ${Styles.fonts.pb}`}>
            No posts yet {'\n'}
            <Text
              onPress={() => navigation.navigate(ADD_POST_SCREEN)}
              className={`text-blue-600 mt-5 text-lg ${Styles.fonts.pr}`}>
              Create a post
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default Posts;
