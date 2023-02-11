/* eslint-disable react-hooks/exhaustive-deps */

import {Post1, ScreenPropType, UserDataType} from '../../types';
import {
  ProfileData,
  ProfileDetails,
  ProfileScreenSkeleton,
  ProfileTop,
  ScrollViewWithRefreshControl,
} from '../../components';

import {GetPostsByUserIdHandler} from '../../requests';
import {GetUserProfileHandler} from '../../requests/handlers/User';
import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../../hooks';

const Profile = ({navigation, route}: ScreenPropType) => {
  const id = route.params;
  const {theme} = useAppSelector(state => state.theme);
  const token = useAppSelector(state => state.auth.token);
  const UserId = useAppSelector(state => state.auth.user?.id);
  const [profile, setProfile] = React.useState<UserDataType>(
    {} as UserDataType,
  );
  const [posts, setPosts] = React.useState<Post1[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<any>({
    profile: false,
    posts: false,
  });
  const getProfile = async () => {
    setLoading({...loading, profile: true});
    const res = await GetUserProfileHandler(id ?? UserId, token);
    setProfile(res);
    setLoading({...loading, profile: false});
  };
  const getPosts = async () => {
    setLoading({...loading, profile: true});
    const res = await GetPostsByUserIdHandler(id ?? UserId);
    setPosts(res);
    setLoading({...loading, profile: false});
  };

  React.useEffect(() => {
    getProfile();
    getPosts();
  }, [id, UserId]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  };
  const onLoadMoreBtnHandler = async () => {
    setLoading({...loading, posts: true});
    const res = await GetPostsByUserIdHandler(id ?? UserId, 10, posts.length);
    setPosts([...posts, ...res]);
    setLoading({...loading, posts: false});
  };

  if (refreshing || loading.profile || loading.posts) {
    return <ProfileScreenSkeleton />;
  }

  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <ScrollViewWithRefreshControl
        onLoadMoreButtonPress={onLoadMoreBtnHandler}
        LoadMoreBtnThreshold={10}
        dataCount={posts.length}
        onRefreshHandler={onRefresh}
        refreshing={refreshing}
        loading={loading.posts}>
        <ProfileTop navigation={navigation} />
        <ProfileDetails
          data={profile}
          navigation={navigation}
          route={{
            user_name: profile.name,
            user_profile: profile.profile,
            id: profile.chat_id,
            user_id: profile.id,
          }}
        />
        <ProfileData data={posts} navigation={navigation} />
      </ScrollViewWithRefreshControl>
    </View>
  );
};

export default Profile;
