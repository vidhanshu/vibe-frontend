export const BASE_URL = 'https://vibe-m39i.onrender.com';
// export const BASE_URL = 'http://192.168.43.35:5000';

/**
 * @description Auth Endpoints
 */
export const CREATE_USER = '/auth/signup';
export const LOGIN_USER = '/auth/login';
export const LOGOUT_USER = '/auth/logout';
export const LOGOUT_ALL_USER = '/auth/logoutall';

/**
 * @description User Endpoints
 */
//get request
export const GET_USER = (user_id: string | number) =>
  `/user/profile/${user_id}`;
export const GET_USER_IMAGE = (image_id: string | number) =>
  `/user/profile/image/${image_id}`;
export const SEARCH_USER = (search: string) => `/user/search?search=${search}`;
//authenticated route
export const GET_FOLLOWERS = (user_id: string | number) =>
  `/user/${user_id}/followers`;
//post request
export const FOLLOW_USER = (user_id: string | number) =>
  `/user/${user_id}/follow`;
//patch request - all authenticated routes
export const UPDATE_NAME = '/user/update/name';
export const UPDATE_USERNAME = '/user/update/username';
export const UPDATE_EMAIL = '/user/update/email';
export const UPDATE_PASSWORD = '/user/update/password';
export const UPDATE_PROFILE_IMAGE = '/user/update/image';
export const UPDATE_MOBILE = '/user/update/mobile';
export const UPDATE_BIO = '/user/update/bio';

/**
 * @description Post Endpoints
 */
//get request
export const GET_HOME_POSTS = '/post';
export const GET_POST_IMAGE = (image_id: string | number) =>
  `/post/${image_id}`;
export const GET_USER_POSTS = (user_id: string | number) =>
  `/post/user/${user_id}`;
export const GET_COMMENTS = (post_id: string | number) =>
  `/post/${post_id}/comments`;
export const GET_LIKED_BY_USERS = (post_id: string | number) =>
  `/post/${post_id}/likedby/users`;
//post request
export const CREATE_POST = '/post/create';
export const CREATE_COMMENT = (post_id: string | number) =>
  `/post/${post_id}/comment`;
//patch request
export const LIKE_POST = (post_id: string | number) => `/post/${post_id}/like`;
export const UPDATE_CAPTION = (post_id: string | number) =>
  `/post/${post_id}/caption`;
export const UPDATE_POST_IMAGE = (post_id: string | number) =>
  `/post/${post_id}/image`;
export const UPDATE_COMMENT = (comment_id: string | number) =>
  `/post/comment/${comment_id}`;
//delete request
export const DELETE_COMMENT = (comment_id: string | number) =>
  `/post/comment/${comment_id}`;
export const DELETE_POST = (post_id: string | number) => `/post/${post_id}`;

/**
 * @description chat Endpoints
 */
//get request
export const GET_ALL_MESSAGES = (
  chat_id: string | number,
  reciever_id: string | number,
) => `/chat/${chat_id}/messages/${reciever_id}`;

export const GET_RECENTS_CHATS = '/chat/recents';
//post request
export const SEND_MESSAGE = (
  chat_id: string | number,
  reciever_id: string | number,
) => `/chat/${chat_id}/message/${reciever_id}`;

/**
 * @description Status Endpoints
 */
//get request
export const GET_STATUS_IMAGE = (user_id: string | number) =>
  `/status/${user_id}`;
export const GET_HOME_STATUSES = '/status';
export const CREATE_STATUS = '/status/create';
export const DELETE_STATUS = '/status/delete';
