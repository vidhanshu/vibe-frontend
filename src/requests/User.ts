import {GET_USER, SEARCH_USER, ax} from '../config';

import {sendResponse} from '../utils';

export const SearchUser = async (query: string) => {
  try {
    const res = await ax.get(SEARCH_USER(query));
    return sendResponse(false, 'whatever i found i sent', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

export const GetUserProfile = async (
  user_id: number | string,
  token: string,
) => {
  try {
    const res = await ax.get(GET_USER(user_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return sendResponse(false, 'whatever i found i sent', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};
