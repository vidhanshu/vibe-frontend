/* eslint-disable react-hooks/exhaustive-deps */

import {
  ChatListScreenSkeleton,
  Container,
  ScrollViewWithRefreshControl,
  SearchBarWithBackButton,
} from '../../components';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RecentChatType, ScreenPropType} from '../../types';
import {getFormattedTime, stringShortener} from '../../utils';

import {CHAT_SCREEN} from '../../config/screens';
import {GetRecentChatsHandler} from '../../requests/handlers/Chat';
import React from 'react';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

const PeopleChatList = ({navigation}: ScreenPropType) => {
  const token = useAppSelector(state => state.auth.token);
  const {theme} = useAppSelector(state => state.theme);
  const [chatList, setChatList] = React.useState<RecentChatType[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getRecentChats = async () => {
    setLoading(true);
    const res = await GetRecentChatsHandler(token);
    setChatList(res);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRecentChats();
    setRefreshing(false);
  };
  const onLoadMoreButtonPress = () => {
    console.log('Load More Button Pressed');
  };

  React.useEffect(() => {
    getRecentChats();
  }, []);

  if (refreshing) {
    return <ChatListScreenSkeleton />;
  }

  return (
    <View className={`${theme.bg__colors.bp} flex-1`}>
      <SearchBarWithBackButton navigation={navigation} />
      <Container className="flex-1 py-0">
        <ScrollViewWithRefreshControl
          loading={loading}
          refreshing={refreshing}
          LoadMoreBtnThreshold={10}
          dataCount={chatList.length}
          onLoadMoreButtonPress={onLoadMoreButtonPress}
          onRefreshHandler={onRefresh}>
          {chatList.map((chat, index) => (
            <ChatCard key={index} chat={chat} navigation={navigation} />
          ))}
        </ScrollViewWithRefreshControl>
      </Container>
    </View>
  );
};

type ChatCardPropType = {
  navigation: any;
  chat: RecentChatType;
};
const ChatCard = ({chat, navigation}: ChatCardPropType) => {
  const {theme} = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity onPress={() => navigation.navigate(CHAT_SCREEN, chat)}>
      <View className="flex-row justify-between my-4 items-center">
        <View className="flex-row gap-x-5">
          <View className="relative w-12">
            <Image
              className="w-12 h-12 rounded-full"
              source={{
                uri: chat.user_profile,
              }}
            />
            <View className="p-[2px] bg-white absolute bottom-0 right-0 rounded-full">
              <View className="bg-green-600 rounded-full w-3 h-3" />
            </View>
          </View>
          <View className="w-1/2 justify-between">
            <Text
              className={`${Styles.fonts.psb} ${theme.text__colors.tp} text-xs`}>
              {chat.user_name}
            </Text>
            <Text
              className={`${Styles.fonts.pl} text-xs ${theme.text__colors.tt}`}>
              <IonIcons name="checkmark-done" size={ICON_DEFAULT_SIZE - 2} />{' '}
              {stringShortener(chat.last_message, 15)}
            </Text>
          </View>
        </View>
        <View className="bg-red-600 rounded-lg p-1 mr-1 h-7 w-7 justify-center items-center">
          <Text className="text-white ">{3}</Text>
        </View>
        <View>
          <Text
            className={`${Styles.fonts.pl} text-xs  ${theme.text__colors.tt}`}>
            {getFormattedTime(chat.last_message_timestamp)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PeopleChatList;
