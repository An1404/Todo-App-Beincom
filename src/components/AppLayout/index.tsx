import React, {ReactNode} from 'react';
import styles from './styles';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
interface IAppLayout {
  children: ReactNode;
  safeTop?: boolean;
}

const AppLayout = (props: IAppLayout) => {
  const {children, safeTop = false} = props;
  return (
    <View style={[styles.root, styles.backgroundColor]}>
      {safeTop && (
        <SafeAreaView edges={['top']} style={styles.backgroundColor} />
      )}
      {children}
      <SafeAreaView edges={['bottom']} style={styles.backgroundColor} />
    </View>
  );
};

export default AppLayout;
