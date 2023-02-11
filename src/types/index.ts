export interface Status {
  id: number;
  image: string;
  user: string;
}
export interface RecentChatType {
  id: number;
  user_id: number;
  user_name: string;
  user_profile: string;
  sender_id: number;
  reciever_id: number;
  last_message: string;
  last_message_timestamp: string;
}

export interface MessageType {
  message: string;
  // sender_name: string;
  // reciever_name: string;
  sentAt: string;
  sender_id: number;
  reciever_id: number;
  chat_id: number;
  // sender_profile: string;
  // reciever_profile: string;
}
export interface Post {
  id: number;
  user: {
    name: string;
    profile_image: string;
  };
  image: string;
  likes: number;
  caption: string;
  posted_at: string;
  location: string;
}
export interface Post1 {
  id: number;
  user_id: number;
  name: string;
  username: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  like_status: boolean;
  profile: string;
  image: string;
}
export interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  name: string;
  profile: string;
  username: string;
  user_id: number;
  post_id: number;
}

export type LikePostType = {
  token: string | null;
  post_id: number;
};

export type CommentPostType = {
  token: string | null;
  post_id: number;
  comment: string;
};
export interface ScreenPropType {
  navigation: any;
  route?: any;
}

export interface Chat {
  id: number;
  user: {
    name: string;
    profile_image: string;
  };
  message: string;
  time: string;
}

export interface Notification {
  id: number;
  user: {
    name: string;
    profile_image: string;
  };
  notification: string;
}

export interface ShortProfile {
  id: number;
  name: string;
  profile_image: string;
  username: string;
}

/* Actual Types for the application components*/

export interface SignUpDataType {
  username: string;
  email: string;
  password: string;
}

export interface LoginDataType {
  email: string;
  password: string;
}

export interface UserDataType {
  id: number;
  name: null | string;
  email: string;
  username: string;
  profile: null | string;
  mobile: null | string;
  bio: null | string;
  registeredAt: string;
  lastLogin: string;
  followers: number;
  following: number;
  chat_id: number;
}

export type StatusType = {
  id: number;
  status: string;
  user_id: number;
  createdAt: string;
  name: string;
  username: string;
  profile: string;
};
export interface UserDataTypeForUpdate {
  id: number;
  name?: string;
  email?: string;
  username?: string;
  profile?: ImageFileType;
  mobile?: string;
  bio?: string;
  password?: string;
}

export type UserLoginReturnType = {
  isLoggedIn: boolean;
  user: UserDataType | null;
  token: string | null;
};

export type ImageFileType = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

export type PostOptionType = {
  icon: React.ReactNode;
  name: string;
  action: (id?: number, data?: any) => void;
};

//post types
export type CreatePostType = {
  token: string | null;
  image: ImageFileType | null;
  caption: string;
};

export type DeleteCommentPropType = {
  token: string | null;
  comment_id: number;
};

export type UpdateCaptionType = {
  caption: string;
  post_id: number | null;
};
