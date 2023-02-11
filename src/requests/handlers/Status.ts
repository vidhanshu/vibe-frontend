import {
  StatusCreateType,
  StatusDelete,
  addStatus,
  getHomeStatuses,
} from '../Status';

import {Alert} from 'react-native';
import {StatusType} from '../../types';

const addStatusHandler = async ({image, token}: StatusCreateType) => {
  try {
    const res = await addStatus({image, token});
    if (res.error) {
      Alert.alert('Error adding status');
    }
  } catch (error) {
    Alert.alert('Error adding status');
  }
};

const StatusDeleteHandler = async (token: string | null) => {
  try {
    await StatusDelete(token);
  } catch (error) {
    Alert.alert('Error adding status');
  }
};

const getHomeStatusesHandler = async (
  limit?: number,
  offset?: number,
): Promise<StatusType[]> => {
  try {
    const res = await getHomeStatuses(limit, offset);
    return res.data.data ?? [];
  } catch (error) {
    Alert.alert('Error fetching statuses');
    return [];
  }
};
export {StatusDeleteHandler, getHomeStatusesHandler, addStatusHandler};
