import React, {memo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {IDateType, ITask} from '@src/AppContainer/models';
import styles from './styles';
import {HIT_SLOP, colors} from '@constants/vars';
import {convertDateTimeToString} from '@src/utils';

export interface TaskCategoryItemProps {
  data: ITask;
  index: number;
  onComplete: (item: ITask, index: number) => void;
  gotoDetail: (item: ITask) => void;
}

const TaskCategoryItem = (props: TaskCategoryItemProps) => {
  const {data, index, onComplete, gotoDetail} = props;
  const [completedAt, setCompletedAt] = useState(data.completedAt);
  const onChangeComplete = () => {
    setCompletedAt(preValue => {
      const now = !preValue ? new Date() : undefined;
      onComplete({...data, completedAt: now}, index);
      return now;
    });
  };
  return (
    <TouchableOpacity
      style={[styles.root, styles.row]}
      activeOpacity={1}
      onPress={() => gotoDetail(data)}>
      <TouchableOpacity
        style={[
          styles.viewIcon,
          {
            borderColor: completedAt ? colors.PRIMARY_COLOR : colors.LINE_GRAY,
          },
        ]}
        activeOpacity={0.8}
        onPress={onChangeComplete}
        hitSlop={HIT_SLOP}>
        {completedAt && <View style={styles.radioSelected} />}
      </TouchableOpacity>
      <View style={[styles.row, styles.viewInfo]}>
        <View>
          <Text style={[styles.txtPrimary, completedAt && styles.txtCompleted]}>
            {data.title}
          </Text>
          {data.notes && <Text style={styles.txtGray}>{data.notes}</Text>}
          {data.dateType && data.dateTime && (
            <Text style={styles.txtGray}>
              {data.listType}
              {': '}
              {convertDateTimeToString(data.dateTime, data.dateType)}
            </Text>
          )}
          {data.completedAt && (
            <Text style={styles.txtGray}>
              Completed:{' '}
              {convertDateTimeToString(data.completedAt, IDateType.DateTime)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TaskCategoryItem);
