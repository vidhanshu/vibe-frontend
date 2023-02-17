/* eslint-disable react-hooks/exhaustive-deps */

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {
  ButtonLoading,
  HomeScreenSkeleton,
  Posts,
  ScrollViewWithRefreshControl,
  Statuses,
  TopBar,
} from '../../components';
import {GetHomePostsHandler, UpdateCaptionHandler} from '../../requests';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {ScreenPropType, StatusType, UpdateCaptionType} from '../../types';
import {StyleSheet, View} from 'react-native';
import {addPostBack, setPosts as setPostsRedux} from '../../redux/reducers';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {BASE_URL} from '../../config';
import {ScrollView} from 'react-native-gesture-handler';
import {getHomeStatusesHandler} from '../../requests/handlers/Status';

const Home = ({navigation, route}: ScreenPropType) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();
  // const
  const [statuses, setStatuses] = React.useState<StatusType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const theme = useAppSelector(state => state.theme.theme);
  const user = useAppSelector(state => state.auth.user);
  const {posts} = useAppSelector(state => state.posts);
  //ref for scroll view to make it scroll to top when user clicks on the top bar
  const ref = React.useRef<ScrollView>(null);
  //when after creating the post we automatically navigates here, we sent the data recived after creating a post to this screen
  const routeData: any = route.params ?? [];

  //when user creates new post, it will be added to the top of the posts so that user can feel like he is posting in real time
  React.useEffect(() => {
    //this checks for various different types of data coming from route

    //this is true when new post added
    if (routeData && routeData.length) {
      dispatch(
        addPostBack({
          ...routeData[0],
          comments: 0,
          like_status: false,
          likes: 0,
        }),
      );
      try {
        ref.current?.scrollTo({
          y: 0,
        });
      } catch (error) {
        console.log(error);
      }
    }
    //this is true when new status added
    if (routeData.statusData) {
      setStatuses([
        {
          id: 1923123124,
          status: `${BASE_URL}/status/${user?.id}?${Math.random()}`,
          user_id: user?.id || 0,
          createdAt: new Date().toISOString(),
          name: user?.name || '',
          username: user?.username || '',
          profile: user?.profile || '',
        },
        ...statuses,
      ]);
    }
    //this is true when status removed
    if (routeData.removeStatus) {
      setStatuses(
        statuses.filter(status => status.user_id !== routeData.removeStatus),
      );
    }
  }, [routeData]);

  //to fetch the posts and store them in the state
  const getPosts = async () => {
    const response = await GetHomePostsHandler(token);
    dispatch(setPostsRedux(response));
  };
  const getStatuses = async () => {
    const res = await getHomeStatusesHandler();
    setStatuses(res);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getPosts();
    await getStatuses();
    setRefreshing(false);
  }, []);

  React.useEffect(() => {
    getPosts();
    getStatuses();
  }, []);

  const onLoadMoreBtnHandler = async () => {
    setLoading(true);
    dispatch(addPostBack(await GetHomePostsHandler(token, 10, posts.length)));
    setLoading(false);
  };
  const onLoadMoreStatusesBtnHandler = async () => {
    setLoading(true);
    setStatuses([
      ...statuses,
      ...(await getHomeStatusesHandler(10, statuses.length)),
    ]);
    setLoading(false);
  };

  //backdrop , bottomsheet and updating caption stuff
  //updated caption
  const [updated_caption, setUpdatedCaption] = useState<UpdateCaptionType>({
    caption: '',
    post_id: null,
  });
  //index
  const [index, setIndex] = useState<number>(-1);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // variables
  const snapPoints = useMemo(() => ['50%', '50%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const openEditPost = () => {
    setIndex(1);
  };

  if (refreshing) {
    return <HomeScreenSkeleton />;
  }

  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <TopBar navigation={navigation} />
      <ScrollViewWithRefreshControl
        onLoadMoreButtonPress={onLoadMoreBtnHandler}
        LoadMoreBtnThreshold={10}
        refreshing={refreshing}
        ref={ref}
        onRefreshHandler={onRefresh}
        dataCount={posts.length}
        loading={loading}>
        <Statuses
          loading={loading}
          loadMore={onLoadMoreStatusesBtnHandler}
          statuses={statuses}
          navigation={navigation}
        />
        <Posts
          openEditPost={openEditPost}
          setUpdatedCaption={setUpdatedCaption}
          navigation={navigation}
        />
      </ScrollViewWithRefreshControl>
      <BottomSheet
        enablePanDownToClose
        onClose={() => setIndex(-1)}
        style={styles.container}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent">
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Updated Caption.."
          value={updated_caption.caption}
          onChangeText={text =>
            setUpdatedCaption({
              ...updated_caption,
              caption: text,
            })
          }
        />
        <ButtonLoading
          onPress={async () => {
            const res = await UpdateCaptionHandler(
              updated_caption.post_id,
              updated_caption.caption,
              token || '',
              setLoading,
            );
            if (res) {
              dispatch(
                setPostsRedux(
                  posts.map(item => {
                    return {
                      ...item,
                      caption: updated_caption.caption,
                    };
                  }),
                ),
              );
            }
            setIndex(-1);
            setUpdatedCaption({
              post_id: null,
              caption: '',
            });
          }}
          loading={loading}>
          Update
        </ButtonLoading>
      </BottomSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 9,
    padding: 10,
  },
});
