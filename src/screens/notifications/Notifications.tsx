import {
  Button,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Container} from '../../components';
import {NOTIFICATIONS} from '../../data/constant';
import NewSectionTitle from '../../components/NewSectionTitle';
import {Notification} from '../../types';
import React from 'react';
import {stringShortener} from '../../utils';
import {useAppSelector} from '../../hooks';
import {Styles} from '../../styles';

const Notifications = () => {
  const {theme} = useAppSelector(state => state.theme);
  return (
    <View className={`flex-1 ${theme.bg__colors.bp}`}>
      <View
        className={`border-b-[1px] ${theme.bg__colors.bp} ${theme.border__colors.bt}`}>
        <Text
          className={`p-4 ${Styles.fonts.pr} text-lg ${theme.text__colors.tt}`}>
          Notifications
        </Text>
      </View>
      <Container className="flex-1 py-0">
        <ScrollView showsVerticalScrollIndicator={false}>
          <NewSectionTitle>This Week</NewSectionTitle>
          <View>
            {NOTIFICATIONS.ThisWeek.map((item, index) => (
              <NotificationCard key={index} data={item} />
            ))}
          </View>
          <NewSectionTitle>This Month</NewSectionTitle>
          <View>
            {NOTIFICATIONS.ThisMonth.map((item, index) => (
              <NotificationCard key={index} data={item} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </View>
  );
};

interface NotificationCardPropType {
  data: Notification;
}

const NotificationCard = ({data}: NotificationCardPropType) => {
  const {theme} = useAppSelector(state => state.theme);

  return (
    <View className="my-3 flex-row justify-between items-center">
      <TouchableOpacity className="flex-row  gap-x-5">
        <Image
          className="w-10 h-10 rounded-full"
          source={{uri: data.user.profile_image}}
        />
        <View>
          <Text className={`${Styles.fonts.pm} ${theme.text__colors.tp}`}>
            {data.user.name}
          </Text>
          <Text
            className={`${Styles.fonts.pr} text-xs ${theme.text__colors.tt}`}>
            {stringShortener(data.notification, 25)}
          </Text>
        </View>
      </TouchableOpacity>
      <Button title="Follow" color="#166ef6" />
    </View>
  );
};
export default Notifications;
