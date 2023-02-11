import {GetUserProfile, SearchUser} from '../User';
import {ShortProfile, UserDataType} from '../../types';

const SearchUserHandler = async (
  query: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<ShortProfile[]> => {
  if (query.trim() === '') {
    return [];
  }
  setLoading(true);
  try {
    const res = await SearchUser(query);
    return res.data.data;
  } catch {
    return [];
  } finally {
    setLoading(false);
  }
};

const GetUserProfileHandler = async (
  user_id: number,
  token: string | null,
): Promise<UserDataType> => {
  if (!user_id || !token || !token.length) {
    return {} as UserDataType;
  }
  try {
    const res = await GetUserProfile(user_id, token);
    return res.data.data;
  } catch {
    return {} as UserDataType;
  }
};
export {SearchUserHandler, GetUserProfileHandler};
