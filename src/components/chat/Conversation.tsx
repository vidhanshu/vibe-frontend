import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {TextInput, View} from 'react-native';

import Container from '../Container';
import IconBtn from '../IconBtn';
import {MessageType} from '../../types';
import Messages from './Messages';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ScrollViewWithRefreshControl from '../ScrollBarWithRefreshControl';
import {SendMessageHandler} from '../../requests/handlers/Chat';
import {SocketContext} from '../../navigation/DynamicStack';
import {Styles} from '../../styles';
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
  const socket = React.useContext(SocketContext);
  const ScrollViewRef = React.useRef<ScrollView>(null);

  const onMessageRecieved = React.useCallback(
    (m: MessageType) => {
      //scroll to bottom as soon as new message is recieved
      ScrollViewRef.current?.scrollToEnd({animated: true});
      setMessages(prev => [...prev, m]);
    },
    [setMessages],
  );

  React.useEffect(() => {
    //on recieving a message from socket
    socket.on('privateChatMessage', onMessageRecieved);
    //cleanup required to stop multiple listeners
    return () => {
      socket.off('privateChatMessage', onMessageRecieved);
      socket.close();
    };
  }, [socket, onMessageRecieved]);

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
      ScrollViewRef.current?.scrollToEnd({animated: true});
    }
    if (chat_id === null) {
      setChatId(res.chat_id);
    }
    setLoading_send(false);
  };

  const handleTypeMessage = React.useCallback(
    (text: string) => setMessage(text),
    [],
  );

  return (
    <>
      <Container className={`${theme.bg__colors.bp} flex-1 py-0`}>
        <ScrollViewWithRefreshControl
          ref={ScrollViewRef}
          loading={loading}
          onLoadMoreButtonPress={onLoadMoreButtonPress}
          dataCount={messages.length}
          onRefreshHandler={onRefresh}
          refreshing={refreshing}
          LoadMoreBtnThreshold={50}
          className="flex-1">
          <Messages messages={messages} />
        </ScrollViewWithRefreshControl>
      </Container>
      <View
        className={`p-2 ${theme.bg__colors.bp} border-t-[1px] ${theme.border__colors.bt}`}>
        <View
          className={`${theme.bg__colors.bgt} rounded-full flex-row justify-between pl-2`}>
          <TextInput
            value={message}
            onChangeText={handleTypeMessage}
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
export default Conversation;
