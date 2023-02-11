import React, {LegacyRef, forwardRef} from 'react';
import {RefreshControl, ScrollView, ScrollViewProps} from 'react-native';

import ButtonLoading from './ButtonLoading';

type ScrollViewWithRefreshControl = ScrollViewProps & {
  refreshing: boolean;
  onRefreshHandler: () => void;
  children: React.ReactNode;
  LoadMoreBtnThreshold: number;
  dataCount: number;
  loading: boolean;
  onLoadMoreButtonPress: () => void;
};
const ScrollViewWithRefreshControl = forwardRef(
  (
    {
      children,
      onRefreshHandler,
      LoadMoreBtnThreshold,
      dataCount,
      loading,
      refreshing,
      onLoadMoreButtonPress,
      ...props
    }: ScrollViewWithRefreshControl,
    ref: LegacyRef<ScrollView> | undefined,
  ) => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshHandler}
          />
        }
        {...props}
        ref={ref}
        className={`flex-1 ${props.className ? props.className : ''}}`}>
        {children}
        {LoadMoreBtnThreshold <= dataCount && (
          <ButtonLoading
            className="w-1/2 mx-auto my-5"
            onPress={onLoadMoreButtonPress}
            loading={loading}
            disabled={loading}>
            Load more
          </ButtonLoading>
        )}
      </ScrollView>
    );
  },
);

export default ScrollViewWithRefreshControl;
