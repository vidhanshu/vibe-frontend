import {
  Comment,
  CommentPostType,
  CreatePostType,
  DeleteCommentPropType,
  LikePostType,
  Post1,
  ShortProfile,
} from '../../types';
import {
  CommentPost,
  CreatePost,
  DeleteComment,
  DeletePost,
  GetComments,
  GetHomePosts,
  GetLikedByUsers,
  GetPostsByUserId,
  LikePost,
  UpdateCaption,
  UpdateComment,
} from '../Post';

import {Alert} from 'react-native';
import React from 'react';

const GetHomePostsHandler = async (
  token: string | null,
  limit?: number,
  offset?: number,
): Promise<Post1[]> => {
  try {
    const res = await GetHomePosts(token, limit, offset);
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data ?? [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const CreatePostHandler = async ({
  token,
  caption,
  image,
  setLoading,
}: CreatePostType & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Post1[]> => {
  if (!token || !image || caption.length < 10) {
    Alert.alert('Incomplete data', 'Please fill all the fields');
    return [];
  }
  setLoading(true);
  try {
    const res = await CreatePost({token, caption, image});
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data ?? [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  } finally {
    setLoading(false);
  }
};

const LikePostHandler = async ({
  token,
  post_id,
  setLoading,
}: LikePostType & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<number> => {
  if (!token) {
    Alert.alert('Error', 'Please login to like the post');
    return 0;
  }
  if (!post_id) {
    Alert.alert('Error', 'Please provide a post id');
    return 0;
  }
  setLoading(true);
  try {
    const res = await LikePost({token, post_id});
    if (res.error) {
      Alert.alert('Error', res.code);
      return 0;
    }
    return res.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return 0;
  } finally {
    setLoading(false);
  }
};

const CommentPostHandler = async ({
  comment,
  post_id,
  token,
  setLoading,
}: CommentPostType & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<Comment | null> => {
  if (!token) {
    Alert.alert('Error', 'Please login to comment on the post');
    return null;
  }
  if (!post_id) {
    Alert.alert('Error', 'Please provide a post id');
    return null;
  }
  if (!comment.length) {
    Alert.alert('Error', 'Please provide a comment');
    return null;
  }
  setLoading(true);
  try {
    const res = await CommentPost({comment, post_id, token});
    if (res.error) {
      Alert.alert('Error', res.code);
      return null;
    }
    return res.data.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

const GetCommentsHandler = async (
  post_id: number | string,
  limit?: number,
  offset?: number,
): Promise<Comment[]> => {
  if (!post_id) {
    Alert.alert('Error', 'Please provide a post id');
    return [];
  }
  try {
    const res = await GetComments(post_id, limit, offset);
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data ?? [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const GetPostsByUserIdHandler = async (
  user_id: number | string,
  limit?: number,
  offset?: number,
): Promise<Post1[]> => {
  if (!user_id) {
    Alert.alert('Error', 'Please provide a user id');
    return [];
  }
  try {
    const res = await GetPostsByUserId(user_id, limit, offset);
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data ?? [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const GetLikedByUsersHandler = async (
  post_id: number | string,
  limit?: number,
  offset?: number,
): Promise<ShortProfile[]> => {
  if (!post_id) {
    Alert.alert('Error', 'Please provide a post id');
    return [];
  }
  try {
    const res = await GetLikedByUsers(post_id, limit, offset);
    if (res.error) {
      Alert.alert('Error', res.code);
      return [];
    }
    return res.data.data ?? [];
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return [];
  }
};

const DeleteCommentHandler = async ({
  comment_id,
  token,
  setLoading,
}: DeleteCommentPropType & {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<number> => {
  if (!comment_id) {
    Alert.alert('Error', 'Please provide a comment id');
    return -1;
  }
  if (!token) {
    Alert.alert('Error', 'Please login to delete the comment');
    return -1;
  }
  setLoading(true);
  try {
    const res = await DeleteComment({comment_id, token});
    if (res.error) {
      Alert.alert('Error', res.code);
      return -1;
    }
    return res.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return -1;
  } finally {
    setLoading(false);
  }
};

const UpdateCommentHandler = async ({
  comment_id,
  token,
  setLoading,
  comment,
}: DeleteCommentPropType & {
  comment: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}): Promise<string | null> => {
  if (!comment.length) {
    Alert.alert('Error', 'Please provide a comment');
    return null;
  }
  if (!token) {
    Alert.alert('Error', 'Please login to update the comment');
    return null;
  }
  setLoading(true);
  try {
    const res = await UpdateComment({comment, comment_id, token});
    if (res.error) {
      Alert.alert('Error', res.code);
      return null;
    }
    return res.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

const DeletePostHandler = async (post_id: number, token: string | null) => {
  try {
    if (!post_id || !token?.length) {
      Alert.alert('Error', 'Please provide a post id');
      return;
    }
    const res = await DeletePost(post_id, token);
    if (res.error) {
      return Alert.alert('Error', res.code);
    }
    return Alert.alert('Success', 'Post deleted successfully');
  } catch (error: any) {
    return Alert.alert('Error', error.message);
  }
};

const UpdateCaptionHandler = async (
  post_id: number | null,
  caption: string,
  token: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<string | null> => {
  if (!caption.length) {
    Alert.alert('Error', 'Please provide a caption');
    return null;
  }
  if (caption.length < 10) {
    Alert.alert('Error', 'Caption length must be >= 10');
    return null;
  }
  if (!token) {
    Alert.alert('Error', 'Please login to update the caption');
    return null;
  }
  if (!post_id) {
    Alert.alert('Error', 'Something went wrong please try again by refreshing');
    return null;
  }
  setLoading(true);
  try {
    const res = await UpdateCaption(post_id, caption, token);
    if (res.error) {
      Alert.alert('Error', res.code);
      return null;
    }
    Alert.alert('Updated Successfully');
    return res.data;
  } catch (error: any) {
    Alert.alert('Error', error.message);
    return null;
  } finally {
    setLoading(false);
  }
};

export {
  CreatePostHandler,
  GetHomePostsHandler,
  LikePostHandler,
  CommentPostHandler,
  GetCommentsHandler,
  DeleteCommentHandler,
  UpdateCommentHandler,
  GetLikedByUsersHandler,
  GetPostsByUserIdHandler,
  DeletePostHandler,
  UpdateCaptionHandler,
};
