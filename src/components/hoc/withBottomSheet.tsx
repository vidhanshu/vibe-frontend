import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

import React from 'react';
import {ScreenPropType} from '../../types';
import {View} from 'react-native';

type HOCProps = {
  navigation: ScreenPropType;
};
type HOCState = {
  index: number;
};
const WithBottomSheet = (OldComponent: React.FC<ScreenPropType>) => {
  class NewComponent extends React.Component<HOCProps, HOCState> {
    bottomSheetRef: any;
    snapPoints: string[] | number[];
    renderBackdrop: (props: BottomSheetBackdropProps) => JSX.Element;
    constructor(props: HOCProps) {
      super(props);
      this.state = {
        index: -1,
      };
      this.bottomSheetRef = React.createRef<BottomSheet>();
      this.snapPoints = ['50%', '50%'];

      this.renderBackdrop = (p: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...p}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        );
      };
    }
    render() {
      return (
        <View className="flex-1 bg-red-600">
          <BottomSheet
            ref={this.bottomSheetRef}
            snapPoints={this.snapPoints}
            enablePanDownToClose={true}
            backdropComponent={this.renderBackdrop}
            index={this.state.index}>
            <OldComponent {...this.props} />
          </BottomSheet>
        </View>
      );
    }
  }
  return NewComponent;
};

export default WithBottomSheet;
