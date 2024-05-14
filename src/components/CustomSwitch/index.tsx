import React, {memo} from 'react';
import {Switch} from 'react-native-switch';
import {colors, wp} from '@constants/vars';
import stylesSwitch from './styles';
export interface CustomSwitchProp {
  onValueChange?: (value: boolean) => void;
  value: boolean;
}
const CustomSwitch = (props: CustomSwitchProp) => {
  const {onValueChange, value} = props;
  return (
    <Switch
      barHeight={wp(6)}
      changeValueImmediately={false}
      circleSize={wp(5)}
      switchBorderRadius={wp(5)}
      backgroundActive={colors.LIGHT_GREEN}
      backgroundInactive={colors.LINE_GRAY}
      onValueChange={onValueChange}
      value={value}
      switchWidthMultiplier={2.2}
      circleBorderWidth={0}
      renderActiveText={false}
      renderInActiveText={false}
      containerStyle={stylesSwitch.container}
      circleActiveColor={colors.WHITE}
      circleInActiveColor={colors.WHITE}
      circleBorderActiveColor={colors.LIGHT_GREEN}
      circleBorderInactiveColor={colors.LINE_GRAY}
    />
  );
};

export default memo(CustomSwitch);
