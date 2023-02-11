import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {Text, TextInput, View} from 'react-native';

import Container from '../Container';
import IconBtn from '../IconBtn';
import {MessageType} from '../../types';
import React from 'react';
import ScrollViewWithRefreshControl from '../ScrollBarWithRefreshControl';
import {SendMessageHandler} from '../../requests/handlers/Chat';
import {Styles} from '../../styles';
import {getFormattedTime} from '../../utils';
import {useAppSelector} from '../../hooks';

type ConversationPropType = {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  refreshing: boolean;
  onRefresh: () => void;
  sendMessageSocket: (message: MessageType) => void;
  onLoadMoreButtonPress: () => void;
  loading: boolean;
  chat_id: number;
  user_id: number;
  setChatId: React.Dispatch<React.SetStateAction<number>>;
};
const Conversation = ({
  messages,
  setMessages,
  onRefresh,
  refreshing,
  loading,
  chat_id,
  user_id,
  setChatId,
  sendMessageSocket,
  onLoadMoreButtonPress,
}: ConversationPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const token = useAppSelector(state => state.auth.token);
  const id = useAppSelector(state => state.auth.user?.id);
  const [loading_send, setLoading_send] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');

  const sendMessage = async () => {
    if (message.trim() === '' || !id) {
      return;
    }
    setLoading_send(true);
    sendMessageSocket({
      chat_id: chat_id,
      message,
      reciever_id: user_id,
      sender_id: id,
      sentAt: new Date().toISOString(),
    });
    const res = await SendMessageHandler(token, chat_id, user_id, message);
    if (res) {
      setMessages([...messages, res]);
      setMessage('');
    }
    if (chat_id === null) {
      console.log('there where no chat_id before');
      setChatId(res.chat_id);
    }
    setLoading_send(false);
  };

  return (
    <>
      <Container className={`${theme.bg__colors.bp} flex-1 py-0`}>
        <ScrollViewWithRefreshControl
          loading={loading}
          onLoadMoreButtonPress={onLoadMoreButtonPress}
          dataCount={messages.length}
          onRefreshHandler={onRefresh}
          refreshing={refreshing}
          LoadMoreBtnThreshold={50}
          className="flex-1">
          {messages.map((chat, index) => {
            if (chat.sender_id === id) {
              return <RightChatBubble key={index} chat={chat} />;
            }
            return <LeftChatBubble key={index} chat={chat} />;
          })}
        </ScrollViewWithRefreshControl>
      </Container>
      <View
        className={`p-2 ${theme.bg__colors.bp} border-t-[1px] ${theme.border__colors.bt}`}>
        <View
          className={`${theme.bg__colors.bgt} rounded-full flex-row justify-between pl-2`}>
          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholderTextColor={'#8b949e'}
            placeholder="Type a message..."
            className={`w-[80%]  p-2 ${Styles.fonts.pr} text-base ${theme.text__colors.tp}`}
          />
          <IconBtn
            loading={loading_send}
            onPress={sendMessage}
            className="bg-[#59b9fe]">
            <IonIcons
              color={'white'}
              name="ios-send-outline"
              size={ICON_DEFAULT_SIZE}
            />
          </IconBtn>
        </View>
      </View>
    </>
  );
};

interface ChatBubblePropType {
  chat: MessageType;
}

const LeftChatBubble = ({chat}: ChatBubblePropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View
      className={`my-2 w-[90%] self-start ${theme.bg__colors.bgchatbubbleleft} p-4 rounded-r-full rounded-tl-full`}>
      <Text className={`${theme.text__colors.tp} ${Styles.fonts.pm} text-base`}>
        {chat.message}
      </Text>
      <Text className={`${theme.text__colors.tt} ${Styles.fonts.pl} text-xs`}>
        {getFormattedTime(chat.sentAt) || new Date().toISOString()}
      </Text>
    </View>
  );
};
const RightChatBubble = ({chat}: ChatBubblePropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View
      className={`my-2 w-[90%] self-end ${theme.bg__colors.bgchatbubbleright} p-4 rounded-l-full rounded-tr-full`}>
      <Text className={`text-white ${Styles.fonts.pm} text-base`}>
        {chat.message}
      </Text>
      <Text className={`text-white ${Styles.fonts.pl} text-xs`}>
        {getFormattedTime(chat.sentAt) || new Date().toISOString()}
      </Text>
    </View>
  );
};
export default Conversation;
