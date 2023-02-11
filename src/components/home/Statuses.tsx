/* eslint-disable react-native/no-inline-styles */

import {ADD_STATUS_SCREEN, STATUS_SCREEN} from '../../config/screens';
import {ICON_DEFAULT_SIZE, IonIcons} from '../../config/icons';
import {Image, Pressable, ScrollView, Text} from 'react-native';
import {
  LINEAR_GRADIENT_START_COLOR,
  LINEAR_GRADIENT_STOP_COLOR,
  Styles,
} from '../../styles';

import {BLANK_PROFILE_IMG} from '../../config/constant';
import Container from '../Container';
import IconBtn from '../IconBtn';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {STATUSES} from '../../data/constant';
import {StatusType} from '../../types';
import {useAppSelector} from '../../hooks';

type StatusesProps = {
  navigation: any;
  statuses: StatusType[];
  loadMore: () => void;
  loading: boolean;
};
const Statuses = ({navigation, statuses, loadMore, loading}: StatusesProps) => {
  return (
    <Container className="py-2 px-0">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CreateStatus navigation={navigation} />
        {statuses.map((status, index) => (
          <StatusCard key={index} navigation={navigation} data={status} />
        ))}
        <IconBtn loading={loading} className="mt-3" onPress={loadMore}>
          <IonIcons
            name="download-outline"
            size={ICON_DEFAULT_SIZE - 5}
            color="#fff"
          />
        </IconBtn>
      </ScrollView>
    </Container>
  );
};

interface StatusCardPropType {
  data: StatusType;
  index?: number;
  navigation: any;
}
const StatusCard: React.FC<StatusCardPropType> = ({
  data,
  index,
  navigation,
}) => {
  const theme = useAppSelector(state => state.theme.theme);
  const {user} = useAppSelector(state => state.auth);

  return (
    <Pressable
      className="w-[72]"
      onPress={() => navigation.navigate(STATUS_SCREEN, data)}
      style={{
        marginRight: index === STATUSES.length - 1 ? 30 : 20,
      }}>
      <LinearGradient
        className="p-1 rounded-full"
        colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}>
        <Image
          source={{uri: data.profile}}
          className="w-16 h-16 rounded-full"
        />
      </LinearGradient>
      <Text
        className={`text-center text-[10px] ${theme.text__colors.tp} mt-2 ${Styles.fonts.pr}`}>
        {user?.id === data.user_id ? 'You' : data.name}
      </Text>
    </Pressable>
  );
};
export default Statuses;

const CreateStatus = ({navigation}: any) => {
  const theme = useAppSelector(state => state.theme.theme);
  const {user} = useAppSelector(state => state.auth);

  return (
    <Pressable
      className="w-[72]"
      onPress={() => navigation.navigate(ADD_STATUS_SCREEN)}
      style={{
        marginRight: 20,
      }}>
      <LinearGradient
        className="p-1 rounded-full"
        colors={[LINEAR_GRADIENT_START_COLOR, LINEAR_GRADIENT_STOP_COLOR]}>
        <Image
          source={{uri: user?.profile || BLANK_PROFILE_IMG}}
          className="w-16 h-16 rounded-full"
        />
        <IconBtn
          onPress={() => navigation.navigate(ADD_STATUS_SCREEN)}
          className="absolute h-9 w-9 translate-x-[18px] translate-y-[18px]">
          <IonIcons color={theme.icon__colors.ip} name="ios-add" size={20} />
        </IconBtn>
      </LinearGradient>
      <Text
        className={`text-center text-[10px] ${theme.text__colors.tp} mt-2 ${Styles.fonts.pr}`}>
        Add status
      </Text>
    </Pressable>
  );
};
