import {
  CREATE_COMMENT,
  CREATE_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_COMMENTS,
  GET_HOME_POSTS,
  GET_LIKED_BY_USERS,
  GET_USER_POSTS,
  LIKE_POST,
  UPDATE_CAPTION,
  UPDATE_COMMENT,
  ax,
} from '../config';
import {
  CommentPostType,
  CreatePostType,
  DeleteCommentPropType,
  LikePostType,
} from '../types';

import {sendResponse} from '../utils';

const GetHomePosts = async (
  token: string | null,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_HOME_POSTS}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'Posts fetched', res.data);
    } else {
      const res = await ax.get(GET_HOME_POSTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'Posts fetched', res.data);
    }
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const CreatePost = async ({token, image, caption}: CreatePostType) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    const res = await ax.post(CREATE_POST, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Post created', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const LikePost = async ({post_id, token}: LikePostType) => {
  try {
    const res = await ax.post(
      LIKE_POST(post_id),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res.data.error) {
      return sendResponse(true, res.data.code, 0);
    }
    return sendResponse(false, 'Post liked/unliked', res.data.data);
  } catch (err: any) {
    return sendResponse(true, err.message, 0);
  }
};

const CommentPost = async ({post_id, token, comment}: CommentPostType) => {
  try {
    const res = await ax.post(
      CREATE_COMMENT(post_id),
      {comment},
      {headers: {Authorization: `Bearer ${token}`}},
    );
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Comment created', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const GetComments = async (
  post_id: string | number,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_COMMENTS(post_id)}?limit=${limit}&offset=${offset}`,
      );
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'Comments fetched', res.data);
    }
    const res = await ax.get(GET_COMMENTS(post_id));
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Comments fetched', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const GetPostsByUserId = async (
  user_id: string | number,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_USER_POSTS(user_id)}?limit=${limit}&offset=${offset}`,
      );
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'Posts fetched', res.data);
    }
    const res = await ax.get(GET_USER_POSTS(user_id));
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Posts fetched', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const GetLikedByUsers = async (
  post_id: string | number,
  limit?: number,
  offset?: number,
) => {
  try {
    if (limit && offset) {
      const res = await ax.get(
        `${GET_LIKED_BY_USERS(post_id)}?limit=${limit}&offset=${offset}`,
      );
      if (res.data.error) {
        return sendResponse(true, res.data.code, null);
      }
      return sendResponse(false, 'Users fetched', res.data);
    }
    const res = await ax.get(GET_LIKED_BY_USERS(post_id));
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Users fetched', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const DeleteComment = async ({comment_id, token}: DeleteCommentPropType) => {
  try {
    const res = await ax.delete(DELETE_COMMENT(comment_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.error) {
      return sendResponse(true, res.data.code, null);
    }
    return sendResponse(false, 'Comment deleted', comment_id);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const UpdateComment = async ({
  comment_id,
  comment,
  token,
}: DeleteCommentPropType & {
  comment: string;
}) => {
  try {
    const res = await ax.patch(
      UPDATE_COMMENT(comment_id),
      {
        comment,
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
    return sendResponse(false, 'Comment deleted', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const DeletePost = async (post_id: number, token: string) => {
  try {
    await ax.delete(DELETE_POST(post_id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return sendResponse(false, 'Post deleted', null);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

const UpdateCaption = async (
  post_id: number,
  caption: string,
  token: string,
) => {
  try {
    const res = await ax.patch(
      UPDATE_CAPTION(post_id),
      {
        caption,
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
    return sendResponse(false, 'Comment deleted', res.data);
  } catch (err: any) {
    return sendResponse(true, err.message, null);
  }
};

export {
  CreatePost,
  GetHomePosts,
  LikePost,
  CommentPost,
  GetComments,
  DeleteComment,
  UpdateComment,
  GetLikedByUsers,
  GetPostsByUserId,
  DeletePost,
  UpdateCaption,
};
