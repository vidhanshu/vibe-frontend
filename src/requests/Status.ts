import {CREATE_STATUS, DELETE_STATUS, GET_HOME_STATUSES, ax} from '../config';

import {ImageFileType} from '../types';
import {sendResponse} from '../utils';

export type StatusCreateType = {
  token: string | null;
  image: ImageFileType | null;
};
const addStatus = async ({token, image}: StatusCreateType) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const res = await ax.post(CREATE_STATUS, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return sendResponse(res.data.error, 'Status added successfully', null);
  } catch (error) {
    return sendResponse(true, 'Error adding status', error);
  }
};

const StatusDelete = async (token: string | null) => {
  try {
    const res = await ax.delete(DELETE_STATUS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return sendResponse(res.data.error, 'Status deleted successfully', null);
  } catch (error) {
    return sendResponse(true, 'Error deleting status', error);
  }
};

const getHomeStatuses = async (limit?: number, offset?: number) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_HOME_STATUSES}?limit=${limit}&offset=${offset}`,
      );
      return sendResponse(
        res.data.error,
        'Statuses fetched successfully',
        res.data,
      );
    }
    const res = await ax.get(GET_HOME_STATUSES);
    return sendResponse(
      res.data.error,
      'Statuses fetched successfully',
      res.data,
    );
  } catch (error) {
    return sendResponse(true, 'Error fetching statuses', error);
  }
};
export {addStatus, getHomeStatuses, StatusDelete};
