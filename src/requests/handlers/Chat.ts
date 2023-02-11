import {GetAllMessages, GetRecentChats, SendMessage} from '../Chat';
import {MessageType, RecentChatType} from '../../types';

import {Alert} from 'react-native';

const GetRecentChatsHandler = async (
  token: string | null,
  limit?: number,
  offset?: number,
): Promise<RecentChatType[]> => {
  try {
    const res = await GetRecentChats(token, limit, offset);
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const GetAllMessagesHandler = async (
  token: string | null,
  chat_id: number,
  reciever_id: number,
  limit?: number,
  offset?: number,
): Promise<MessageType[]> => {
  try {
    if (!token) {
      throw new Error('Token is not provided');
    }
    const res = await GetAllMessages(
      token,
      chat_id,
      reciever_id,
      limit,
      offset,
    );
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    if (res.data?.data) {
      return res.data.data;
    }
    return [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const SendMessageHandler = async (
  token: string | null,
  chat_id: string | number,
  reciever_id: string | number,
  message: string,
): Promise<MessageType> => {
  try {
    if (!token) {
      throw new Error('Token is not provided');
    }
    const res = await SendMessage(token, chat_id, reciever_id, message);
    if (res.error) {
      Alert.alert('Error', res.code);
      return {} as MessageType;
    }
    return res.data.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return {} as MessageType;
  }
};

export {GetRecentChatsHandler, GetAllMessagesHandler, SendMessageHandler};
