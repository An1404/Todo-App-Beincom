import React, {memo} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import CustomSwitch from '@src/components/CustomSwitch';
import {Icon, colors, wp} from '@constants/vars';
import {RowDateTimeProps, RowDateTimeType} from './models';
import useRowDateTime from './useRowDateTime';

const RowDateTime = (props: RowDateTimeProps) => {
  const {icon, type, value, isActive, onChangeSection} = props;
  const {} = useRowDateTime(props);
  return (
    <View style={styles.row}>
      <View
        style={[
          styles.viewIconDateTime,
          {
            backgroundColor:
              type === RowDateTimeType.Time
                ? colors.PRIMARY_COLOR
                : colors.BLUE,
          },
        ]}>
        <Icon.AntDesign name={icon} size={wp(5)} color={colors.WHITE} />
      </View>
      <View
        style={[
          styles.row,
          styles.viewTitleDateTime,
          type === RowDateTimeType.Date && styles.line,
        ]}>
        <View>
          <Text style={styles.txtDate}>{type}</Text>
          {isActive && <Text style={styles.txtTime}>{value}</Text>}
        </View>
        <CustomSwitch value={isActive} onValueChange={onChangeSection} />
      </View>
    </View>
  );
};

export default memo(RowDateTime);
