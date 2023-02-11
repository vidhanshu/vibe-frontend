import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';

import {View} from 'react-native';

type BottomSheetWithBackdropProps = {
  children: React.ReactNode;
  bottomSheetChildren: React.ReactNode;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
};
const BottomSheetWithBackdrop = ({
  children,
  bottomSheetChildren,
  index,
  setIndex,
}: BottomSheetWithBackdropProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['60%', '60%'], []);
  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  }, []);
  return (
    <View className="flex-1">
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        index={index}
        onClose={() => {
          setIndex(-1);
        }}>
        {bottomSheetChildren}
      </BottomSheet>
    </View>
  );
};

export default BottomSheetWithBackdrop;
