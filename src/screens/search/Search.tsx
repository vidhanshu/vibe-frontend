import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Container, SearchBarWithBackButton} from '../../components';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {ScreenPropType, ShortProfile} from '../../types';

import NewSectionTitle from '../../components/NewSectionTitle';
import {PROFILE_SCREEN} from '../../config/screens';
import React from 'react';
import {SearchUserHandler} from '../../requests/handlers/User';
import {Styles} from '../../styles';
import {useAppSelector} from '../../hooks';

const Search = ({navigation}: ScreenPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  const [query, setQuery] = React.useState<string>('');
  const [userList, setUserList] = React.useState<ShortProfile[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <Container className=" py-0 px-1 items-center w-full">
        <SearchBarWithBackButton
          shouldShowBackButton={false}
          navigation={navigation}
          setQuery={setQuery}
          onChangeText={async text => {
            setQuery(text);
            const res = await SearchUserHandler(text, setLoading);
            if (res) {
              setUserList(res);
            }
          }}
          value={query}
          placeholder="Search for people..."
        />
      </Container>
      <SearchList
        userList={userList}
        navigation={navigation}
        query={query}
        loading={loading}
      />
    </View>
  );
};

export default Search;
type RecentSearchCardPropType = {
  data?: ShortProfile;
  navigation: any;
  userList?: ShortProfile[];
  loading?: boolean;
};
const SearchList = ({
  navigation,
  query,
  userList,
  loading,
}: RecentSearchCardPropType & {
  query: string;
}) => {
  const {theme} = useAppSelector(state => state.theme);
  if (!query.length) {
    return (
      <Text
        className={`${Styles.fonts.pm} ${theme.text__colors.tt} my-6 text-center`}>
        Start Typing to search{'\n'}
        <Text
          className={`${Styles.fonts.pm} text-blue-500 text-base my-2 text-center`}>
          Awesome people like you
        </Text>
      </Text>
    );
  } else {
    return (
      <Container className={`flex-1 py-0 ${theme.bg__colors.bp}`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewSectionTitle>Results</NewSectionTitle>
          {userList?.length ? (
            userList?.map((item, index) => (
              <RecentSearchCard
                key={index}
                navigation={navigation}
                data={item}
              />
            ))
          ) : (
            <>
              {loading ? (
                <ActivityIndicator size="large" color={theme.colors.s} />
              ) : (
                <Text
                  className={`${Styles.fonts.pm} ${theme.text__colors.tp} text-center`}>
                  No match found
                </Text>
              )}
            </>
          )}
        </ScrollView>
      </Container>
    );
  }
};

const RecentSearchCard = ({data, navigation}: RecentSearchCardPropType) => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View className="mb-4 flex-row justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(PROFILE_SCREEN, data?.id);
        }}
        className="flex-row  gap-x-5">
        <Image
          className="w-10 h-10 rounded-full"
          source={{uri: data?.profile_image}}
        />
        <View>
          <Text className={`${Styles.fonts.pm} ${theme.text__colors.tp}`}>
            {data?.name}
          </Text>
          <Text className={`${Styles.fonts.pr} ${theme.text__colors.tt}`}>
            {data?.username}
          </Text>
        </View>
      </TouchableOpacity>
      <IonIcons
        name="ios-close-outline"
        size={ICON_DEFAULT_SIZE}
        color={theme.icon__colors.ip}
      />
    </View>
  );
};
