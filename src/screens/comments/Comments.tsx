import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import {AntIcons, ICON_DEFAULT_SIZE} from '../../config/icons';
import {Comment, Post1, ScreenPropType} from '../../types';
import {
  CommentPostHandler,
  DeleteCommentHandler,
  GetCommentsHandler,
  UpdateCommentHandler,
} from '../../requests';
import {Container, ScrollViewWithRefreshControl} from '../../components';
import React, {useEffect} from 'react';

import {BLANK_PROFILE_IMG} from '../../config/constant';
import NewSectionTitle from '../../components/NewSectionTitle';
import {PROFILE_SCREEN} from '../../config/screens';
import {Styles} from '../../styles';
import {getTimeDifference} from '../../utils';
import {useAppSelector} from '../../hooks';

const Comments = ({route, navigation}: ScreenPropType) => {
  const {caption, name, id}: Post1 = route.params;
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [comment, setComment] = React.useState<string>('');
  const {theme} = useAppSelector(state => state.theme);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const token = useAppSelector(state => state.auth.token);
  const profile = useAppSelector(state => state.auth.user?.profile);
  const textInputRef = React.useRef<TextInput>(null);
  const [isUpdating, setIsUpdating] = React.useState<any>({
    status: false,
    id: '',
  });
  const getComments = async () => {
    setLoading(true);
    const res = await GetCommentsHandler(id);
    setComments(res);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await GetCommentsHandler(id);
    setComments(res);
    setRefreshing(false);
  };

  const onLoadMoreBtnHandler = async () => {
    setLoading(true);
    setComments([
      ...comments,
      ...(await GetCommentsHandler(id, 10, comments.length)),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <Container
        className={`flex-row gap-x-4 py-4 ${theme.bg__colors.bp} ${theme.borders.bbt}`}>
        <AntIcons
          onPress={() => navigation.goBack()}
          name="left"
          size={ICON_DEFAULT_SIZE}
          color={theme.colors.s}
        />
        <Text className={`${Styles.fonts.pm} ${theme.text__colors.tt} text-lg`}>
          Comments
        </Text>
      </Container>
      {/* to show the status of presence of comments-> loading, exists or  doesn't exists */}
      <ScrollViewWithRefreshControl
        LoadMoreBtnThreshold={10}
        dataCount={comments.length}
        loading={loading}
        onRefreshHandler={onRefresh}
        refreshing={refreshing}
        onLoadMoreButtonPress={onLoadMoreBtnHandler}>
        <Container className="py-4">
          <Text
            className={`text-sm ${theme.text__colors.tt} ${Styles.fonts.psb}`}>
            {name} .{' '}
            <Text
              className={`text-sm ${theme.text__colors.tt}  ${Styles.fonts.pr}`}>
              {caption}
            </Text>
          </Text>
          <NewSectionTitle className="mb-0">Comments</NewSectionTitle>
        </Container>
        {/* to show the status of presence of comments-> loading, exists or  doesn't exists */}
        <Container>
          {comments.length > 0 ? (
            comments.map((item, index) => (
              <CommentCard
                navigation={navigation}
                setIsUpdating={setIsUpdating}
                textInputRef={textInputRef}
                setComment={setComment}
                setComments={setComments}
                key={index}
                comment={item}
              />
            ))
          ) : (
            <Text
              className={`${Styles.fonts.pr} ${theme.text__colors.tt} text-center`}>
              {loading ? <ActivityIndicator /> : 'No comments yet'}
            </Text>
          )}
        </Container>
      </ScrollViewWithRefreshControl>

      {/* text input for chat */}
      <View
        className={`border-t-[1px] ${theme.border__colors.bt} ${theme.bg__colors.bp} flex-row items-center p-2 gap-x-4`}>
        {!isUpdating.status && (
          <Image
            className="w-8 h-8 rounded-full"
            source={{
              uri: profile ?? BLANK_PROFILE_IMG,
            }}
          />
        )}
        {/* text input using which user can comment */}
        <TextInput
          ref={textInputRef}
          onChangeText={value => setComment(value)}
          className={`flex-1 ${Styles.fonts.pr} ${theme.text__colors.tp}`}
          value={comment}
          placeholder="Type comment here..."
          placeholderTextColor={'#8b949e'}
        />
        {/* comment -> state to store the comment which user types */}
        {comment.length > 0 ? (
          //if loading show activity indicator
          <View>
            {loading ? (
              <ActivityIndicator color={theme.colors.s} />
            ) : (
              // conditionaly rendering the update or post button depending on the update status
              <>
                {isUpdating.status ? (
                  <View className="flex-row gap-x-2">
                    <Text
                      onPress={() => {
                        setIsUpdating({status: false, id: ''});
                        setComment('');
                      }}
                      className={`text-red-600 ${Styles.fonts.pr} pr-2`}>
                      cancel
                    </Text>
                    <Text
                      disabled={loading}
                      onPress={async () => {
                        const res = await UpdateCommentHandler({
                          comment_id: isUpdating.id,
                          token,
                          comment,
                          setLoading,
                        });
                        if (res) {
                          const newComments = comments.map(item => {
                            if (item.id === isUpdating.id) {
                              return {...item, comment};
                            }
                            return item;
                          });
                          setComments(newComments);
                          setComment('');
                        }
                        setIsUpdating({status: false, id: ''});
                      }}
                      className={`text-blue-600 ${Styles.fonts.pr} pr-2`}>
                      update
                    </Text>
                  </View>
                ) : (
                  <Text
                    disabled={loading}
                    onPress={async () => {
                      const res = await CommentPostHandler({
                        post_id: id,
                        token,
                        comment,
                        setLoading,
                      });
                      if (res) {
                        setComments([
                          {...res, createdAt: new Date().toISOString()},
                          ...comments,
                        ]);
                        setComment('');
                      }
                    }}
                    className={`text-blue-600 ${Styles.fonts.pr} pr-2`}>
                    Post
                  </Text>
                )}
              </>
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
};

type CommentCardPropType = {
  navigation: any;
  comment: Comment;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  textInputRef: React.RefObject<TextInput>;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsUpdating: React.Dispatch<React.SetStateAction<any>>;
};

const CommentCard = ({
  comment,
  setComment,
  textInputRef,
  setComments,
  setIsUpdating,
  navigation,
}: CommentCardPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const {token} = useAppSelector(state => state.auth);
  const id = useAppSelector(state => state.auth.user?.id);
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <View className="flex-row gap-x-2 my-5">
      <Image className="w-8 h-8 rounded-full" source={{uri: comment.profile}} />
      <View className="flex-1">
        <Text
          onPress={() => navigation.navigate(PROFILE_SCREEN, comment.user_id)}
          className={`${theme.text__colors.tp} ${Styles.fonts.psb}`}>
          {comment.name}
        </Text>
        <Text className={`${theme.text__colors.tt} ${Styles.fonts.pr}`}>
          {comment.comment}
        </Text>
        <View className="flex-row gap-x-5 mt-2">
          <Text className={`${Styles.fonts.pr} ${theme.text__colors.txt}`}>
            {getTimeDifference(comment.createdAt)}
          </Text>
          {comment.user_id === id ? (
            <Text
              onPress={() => {
                setComment(comment.comment);
                setIsUpdating({
                  status: true,
                  id: comment.id,
                });
                textInputRef.current?.focus();
              }}
              className={`${Styles.fonts.pr} ${theme.text__colors.txt}`}>
              Edit
            </Text>
          ) : (
            <Text
              onPress={() => {
                setComment(`@${comment.username} `);
                textInputRef.current?.focus();
              }}
              className={`${Styles.fonts.pr} ${theme.text__colors.txt}`}>
              Reply
            </Text>
          )}
          {comment.user_id === id && (
            <Text
              onPress={() => {
                Alert.alert('Delete comment', 'Are you sure?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Delete',
                    onPress: async () => {
                      const res = await DeleteCommentHandler({
                        comment_id: comment.id,
                        token,
                        setLoading: setLoading,
                      });
                      if (res > 0) {
                        setComments(prev =>
                          prev.filter(item => item.id !== res),
                        );
                      }
                    },
                  },
                ]);
              }}
              className={`${Styles.fonts.pr} ${theme.text__colors.txt}`}>
              {loading ? (
                <ActivityIndicator color={theme.colors.s} />
              ) : (
                'Delete'
              )}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
export default Comments;
