import {AntIcons, ICON_DEFAULT_SIZE, IonIcons, MCIcons} from '../config/icons';
import {
  COMMENTS_SCREEN,
  LIKED_BY_SCREEN,
  PROFILE_SCREEN,
  SIGNLE_POST_SCREEN,
} from '../config/screens';
import {Post1, PostOptionType} from '../types';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {
  countShortForm,
  getForamttedDate,
  getFormattedTime,
  getTimeDifference,
  stringShortener,
} from '../utils';

import Container from './Container';
import FastImage from 'react-native-fast-image';
import IconBtn from './IconBtn';
import {LikePostHandler} from '../requests';
import React from 'react';
import {SCREEN_WIDTH} from '../config/constant';
import {Styles} from '../styles';
import {useAppSelector} from '../hooks';

interface PostCardPropType {
  data: Post1;
  navigation: any;
  shouldShowPostOptions?: boolean;
  options?: PostOptionType[];
  shouldShowCollapsableCaption?: boolean; // if true then caption will be collapsable
  shouldShowTopBorder?: boolean;
  onImagePress: () => void;
  InfoLable?: React.ReactNode;
}
const PostCard = ({
  data,
  navigation,
  options = [],
  shouldShowPostOptions = options.length > 0,
  shouldShowCollapsableCaption = true,
  shouldShowTopBorder = true,
  InfoLable,
  onImagePress = () => {
    navigation.navigate(SIGNLE_POST_SCREEN, data);
  },
}: PostCardPropType) => {
  const [likes, setLikes] = React.useState<number>(data.likes);
  const [liked, setLiked] = React.useState<boolean>(data.like_status);
  const [bookmark, setBookmark] = React.useState<boolean>(false);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [readMore, setReadMore] = React.useState<boolean>(
    !shouldShowCollapsableCaption,
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const {theme} = useAppSelector(state => state.theme);
  const token = useAppSelector(state => state.auth.token);

  return (
    <View
      className={`py-5  ${theme.border__colors.bt} relative border-t-[${
        shouldShowTopBorder ? '1px' : '0px'
      }]`}>
      {/* Top details of post */}
      <Container className="py-0 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => navigation.navigate(PROFILE_SCREEN, data.user_id)}
          className="flex-row items-center gap-x-2">
          <FastImage
            source={{uri: data.profile}}
            className="w-10 h-10 rounded-full"
          />
          <View>
            <Text
              className={`${Styles.fonts.pm} text-base ${theme.text__colors.tp}`}>
              {data.name}
            </Text>
            <Text className={`${Styles.fonts.pr} ${theme.text__colors.tt}`}>
              {getForamttedDate(data.createdAt)}{' '}
              {getFormattedTime(data.createdAt)} .{' '}
              {getTimeDifference(data.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>
        {shouldShowPostOptions && (
          <View className="relative">
            <IconBtn
              onPress={() => setShowMenu(i => !i)}
              className={`h-10 w-10 ${showMenu && theme.bg__colors.bgpurplel}`}>
              <MCIcons
                name="dots-horizontal-circle-outline"
                size={ICON_DEFAULT_SIZE}
                color={`${showMenu ? '#991fe4' : theme.icon__colors.ip}`}
              />
            </IconBtn>
            {showMenu ? (
              <View
                className={`rounded-md shadow-lg border-[1px] ${theme.border__colors.bt} ${theme.bg__colors.bp} absolute top-[100%] z-10 w-52 right-0 p-1 gap-y-1`}>
                {options.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.name === 'Delete post') {
                        item.action(data.id);
                      } else if (item.name === 'Edit post') {
                        item.action(0, data);
                      } else {
                        item.action();
                      }
                      setShowMenu(false);
                    }}
                    key={index}
                    className={`p-2 ${theme.bg__colors.bgt} rounded-md flex-row`}>
                    {item.icon}
                    <Text
                      className={`ml-2 ${Styles.fonts.pm} ${theme.text__colors.tp}`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        )}
      </Container>
      {/* image and like,comment,bookmark */}
      <View className="mt-5 mb-2">
        <Pressable onPress={onImagePress} className="relative">
          <FastImage
            source={{uri: data.image}}
            className="w-full"
            defaultSource={require('../assets/images/skeleton.png')}
            style={{
              height: SCREEN_WIDTH,
            }}
          />
          {InfoLable ? InfoLable : null}
        </Pressable>
        {/* like , comment, bookmark */}
        <Container className="flex-row mt-5 gap-x-5 py-0">
          <View className="flex-row gap-x-1 items-center">
            <IconBtn
              loading={loading}
              className={`h-10 w-10 ${liked && theme.bg__colors.bgpurplel}`}
              onPress={async () => {
                const res = await LikePostHandler({
                  token,
                  post_id: data.id,
                  setLoading,
                });
                if (res) {
                  setLikes(likes + res);
                  setLiked(i => !i);
                }
              }}>
              <IonIcons
                name={`${liked ? 'ios-heart-sharp' : 'ios-heart-outline'}`}
                size={ICON_DEFAULT_SIZE}
                color={`${liked ? '#f14b6f' : theme.icon__colors.ip}`}
              />
            </IconBtn>
            <Text
              onPress={() => navigation.navigate(LIKED_BY_SCREEN, data.id)}
              className={`${Styles.fonts.pr} ${theme.text__colors.tp}`}>
              {countShortForm(likes)}
            </Text>
          </View>
          <View className="flex-row gap-x-1 items-center">
            <IconBtn
              onPress={() => {
                navigation.navigate(COMMENTS_SCREEN, data);
              }}
              className={'h-10 w-10'}>
              <AntIcons
                name="message1"
                size={ICON_DEFAULT_SIZE}
                color={theme.icon__colors.ip}
              />
            </IconBtn>
            <Text className={`${Styles.fonts.pr} ${theme.text__colors.tp}`}>
              {countShortForm(data.comments || 0)}
            </Text>
          </View>
          <IconBtn
            onPress={() => {
              setBookmark(i => !i);
            }}
            className={`h-10 w-10 ${bookmark && theme.bg__colors.bgpurplel}`}>
            <IonIcons
              name={`${bookmark ? 'ios-bookmark' : 'bookmark-outline'}`}
              size={ICON_DEFAULT_SIZE}
              color={`${bookmark ? '#991fe4' : theme.icon__colors.ip}`}
            />
          </IconBtn>
        </Container>
      </View>
      {/* caption */}
      <Container className="mt-1 py-0">
        <Text className={`${Styles.fonts.pm} ${theme.text__colors.tp}`}>
          {data.name}
          {'\n'}
          <Text className={`${Styles.fonts.pr} ${theme.text__colors.tt}`}>
            {readMore ? (
              <Text
                disabled={!shouldShowCollapsableCaption}
                onPress={() => setReadMore(false)}>
                {data.caption}
              </Text>
            ) : (
              <Text
                disabled={!shouldShowCollapsableCaption}
                onPress={() => setReadMore(true)}>
                {stringShortener(data.caption, 60)}...
                <Text className="text-gray-500"> more</Text>
              </Text>
            )}
          </Text>
        </Text>
      </Container>
    </View>
  );
};

export default PostCard;
