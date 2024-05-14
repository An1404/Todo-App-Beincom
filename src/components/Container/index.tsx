import React, {ReactNode} from 'react';
import styles from './styles';
import {Keyboard, StatusBar, View} from 'react-native';
import {colors} from '@constants/vars';
interface IContainer {
  children: ReactNode;
}

const Container = (props: IContainer) => {
  const {children} = props;
  return (
    <View
      style={styles.root}
      onStartShouldSetResponder={() => Keyboard.dismiss()}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={colors.SECONDARY_BACKGROUND_COLOR}
      />
      {children}
    </View>
  );
};

export default Container;
