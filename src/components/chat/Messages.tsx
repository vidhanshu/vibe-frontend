import {Text, View} from 'react-native';

import {MessageType} from '../../types';
import React from 'react';
import {Styles} from '../../styles';
import {getFormattedTime} from '../../utils';
import {useAppSelector} from '../../hooks';

type MessagePropsType = {
  messages: MessageType[];
};
const Messages = ({messages}: MessagePropsType) => {
  const id = useAppSelector(state => state.auth.user?.id);
  return (
    <>
      {messages.map((chat, index) => {
        if (chat.sender_id === id) {
          return <RightChatBubble key={index} chat={chat} />;
        }
        return <LeftChatBubble key={index} chat={chat} />;
      })}
    </>
  );
};

export default React.memo(Messages);

interface ChatBubblePropType {
  chat: MessageType;
}

const LeftChatBubble = ({chat}: ChatBubblePropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View
      className={`my-2 w-[90%] self-start ${theme.bg__colors.bgchatbubbleleft} p-4 rounded-r-md rounded-tl-md`}>
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
      className={`my-2 w-[90%] self-end ${theme.bg__colors.bgchatbubbleright} p-4 rounded-l-md rounded-tr-md`}>
      <Text className={`text-white ${Styles.fonts.pm} text-base`}>
        {chat.message}
      </Text>
      <Text className={`text-white ${Styles.fonts.pl} text-xs`}>
        {getFormattedTime(chat.sentAt) || new Date().toISOString()}
      </Text>
    </View>
  );
};
