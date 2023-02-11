/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */

import {View, ViewProps} from 'react-native';

import React from 'react';

type ProgressBarProps = ViewProps & {
  timing: number;
  onEnd?: () => void;
};
const ProgressBar = ({
  timing,
  onEnd = () => {},
  ...props
}: ProgressBarProps) => {
  const [timer, setTimer] = React.useState<number>(0);
  React.useEffect(() => {
    const id = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    const id_2 = setTimeout(() => {
      onEnd();
      clearInterval(id);
    }, timing * 1000);

    return () => {
      clearInterval(id);
      clearTimeout(id_2);
    };
  }, []);

  return (
    <View
      {...props}
      className={`w-full bg-black ${props.className ? props.className : ''}`}>
      <View
        style={{
          width: `${(timer / timing) * 100}%`,
          height: 5,
          backgroundColor: 'white',
        }}
      />
    </View>
  );
};

export default ProgressBar;
