import {GET_ALL_MESSAGES, GET_RECENTS_CHATS, SEND_MESSAGE, ax} from '../config';

import {sendResponse} from '../utils';

const GetAllMessages = async (
  token: string | null,
  chat_id: number,
  reciever_id: number,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_ALL_MESSAGES(
          chat_id,
          reciever_id,
        )}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'messages fetched', res.data);
    } else {
      const res = await ax.get(GET_ALL_MESSAGES(chat_id, reciever_id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'messages fetched', res.data);
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return sendResponse(true, 'Unauthorized', null);
    }
    return sendResponse(false, 'Success', null);
  }
};

const GetRecentChats = async (
  token: string | null,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_RECENTS_CHATS}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'chats fetched', res.data);
    } else {
      const res = await ax.get(GET_RECENTS_CHATS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'chats fetched', res.data);
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      return sendResponse(true, 'Unauthorized', null);
    }
    return sendResponse(false, 'Success', null);
  }
};

/**
 * message , chat_id , reciever_id
 */
const SendMessage = async (
  token: string | number,
  chat_id: string | number,
  reciever_id: string | number,
  message: string,
) => {
  try {
    const res = await ax.post(
      SEND_MESSAGE(chat_id, reciever_id),
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'message sent', res.data);
  } catch (error) {
    return sendResponse(true, 'Error', null);
  }
};
export {GetRecentChats, GetAllMessages, SendMessage};
