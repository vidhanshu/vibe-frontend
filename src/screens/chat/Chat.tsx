/* eslint-disable react-hooks/exhaustive-deps */
import {ChatTop, Conversation} from '../../components';
import {MessageType, RecentChatType, ScreenPropType} from '../../types';

import {GetAllMessagesHandler} from '../../requests/handlers/Chat';
import React from 'react';
import {SocketContext} from '../../navigation/DynamicStack';
import {View} from 'react-native';
import {useAppSelector} from '../../hooks';

const Chat = ({navigation, route}: ScreenPropType) => {
  //other stuff
  const [messages, setMessages] = React.useState<MessageType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const token = useAppSelector(state => state.auth.token);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const {id: chat_id, user_id: opposite_user_id}: RecentChatType = route.params;
  const [chatId, setChatId] = React.useState<number>(chat_id ?? null);
  const socket = React.useContext(SocketContext);
  const id = useAppSelector(state => state.auth.user?.id);

  const getMessages = async () => {
    setLoading(true);
    const res = await GetAllMessagesHandler(token, chatId, opposite_user_id);
    setMessages(res);
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await getMessages();
    setRefreshing(false);
  };
  const onLoadMoreBtnPress = async () => {
    setLoading(true);
    const res = await GetAllMessagesHandler(
      token,
      chat_id,
      opposite_user_id,
      50,
      messages.length,
    );
    setMessages([...messages, ...res]);
    setLoading(false);
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  //socket.io stuff
  React.useEffect(() => {
    //reconnect if the socket is disconnected
    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit('privateChatRequest', {
      senderId: id,
      receiverId: opposite_user_id,
    });
  }, []);

  const sendMessage = (message: MessageType) => {
    socket.emit('privateChatMessage', message);
  };

  return (
    <View className="flex-1">
      <ChatTop route={route} navigation={navigation} />
      <Conversation
        loading={loading}
        onLoadMoreButtonPress={onLoadMoreBtnPress}
        refreshing={refreshing}
        onRefresh={onRefresh}
        messages={messages}
        setMessages={setMessages}
        sendMessageSocket={sendMessage}
        user_id={opposite_user_id}
        chat_id={chatId}
        setChatId={setChatId}
      />
    </View>
  );
};

export default Chat;
