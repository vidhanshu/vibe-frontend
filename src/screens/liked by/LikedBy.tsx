import {Button, Image, Text, TouchableOpacity, View} from 'react-native';
import {
  Container,
  CustomeHeader,
  ScrollViewWithRefreshControl,
} from '../../components';
import React, {useState} from 'react';
import {ScreenPropType, ShortProfile} from '../../types';

import {GetLikedByUsersHandler} from '../../requests';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

const LikedBy = ({navigation, route}: ScreenPropType) => {
  const id = route.params;

  const {theme} = useAppSelector(state => state.theme);

  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [likedBy, setLikedBy] = React.useState<ShortProfile[]>([]);

  const GetLikedByUsers = async () => {
    setLoading(true);
    const res = await GetLikedByUsersHandler(id);
    if (res) {
      setLikedBy(res);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    GetLikedByUsers();
    setRefreshing(false);
  };
  const onLoadMoreBtnHandler = async () => {
    setLoading(true);
    setLikedBy([
      ...likedBy,
      ...(await GetLikedByUsersHandler(id, 10, likedBy.length)),
    ]);
    setLoading(false);
  };

  React.useEffect(() => {
    GetLikedByUsers();
  }, []);

  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <ScrollViewWithRefreshControl
        loading={loading}
        refreshing={refreshing}
        onRefreshHandler={onRefresh}
        onLoadMoreButtonPress={onLoadMoreBtnHandler}
        dataCount={likedBy.length}
        LoadMoreBtnThreshold={10}>
        <CustomeHeader navigation={navigation} label="Liked by" />
        <Container>
          {likedBy.map(item => {
            return <LikedByCard key={item.id} {...item} />;
          })}
        </Container>
      </ScrollViewWithRefreshControl>
    </View>
  );
};

export default LikedBy;

const LikedByCard = (data: ShortProfile) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View className="my-3 flex-row justify-between items-center">
      <TouchableOpacity className="flex-row  gap-x-5">
        <Image
          className="w-10 h-10 rounded-full"
          source={{uri: data.profile_image}}
        />
        <View>
          <Text className={`${Styles.fonts.pm} ${theme.text__colors.tp}`}>
            {data.name}
          </Text>
          <Text
            className={`${Styles.fonts.pr} text-xs ${theme.text__colors.tt}`}>
            {data.username}
          </Text>
        </View>
      </TouchableOpacity>
      <Button title="Follow" color="#166ef6" />
    </View>
  );
};
