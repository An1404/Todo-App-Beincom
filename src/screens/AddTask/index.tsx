import {Icon, colors, wp} from '@constants/vars';
import AppLayout from '@src/components/AppLayout';
import moment from 'moment';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import RowDateTime from './components/RowDateTime';
import {RowDateTimeType} from './components/RowDateTime/models';
import {ISectionDateTime} from './models';
import styles from './styles';
import useAddTask from './useAddTask';
import {IMyList} from '@src/AppContainer/models';
import {getDateFromNow} from '@src/utils';
import {DATE_TIME_FORMAT} from '@constants/datetimes';

interface IAddTask {
  navigation: any;
}

const AddTask = ({navigation}: IAddTask) => {
  const {
    isDateOn,
    isTimeOn,
    activeSectionDateTime,
    listSelected,
    dateTimeSelected,
    appData,
    taskTitle,
    propsData,
    updateSectionDateTime,
    onToggleDate,
    onToggleTime,
    onSelectList,
    onDateChange,
    onTimeChange,
    onChangeTaskTitle,
    onChangeNotes,
    handleAddTask,
  } = useAddTask();

  const headerRight = useCallback(() => {
    const isDisable = !taskTitle;
    return (
      <TouchableOpacity
        onPress={handleAddTask}
        style={{marginEnd: wp(5)}}
        disabled={isDisable}>
        <Text style={[styles.textHeaderRight, isDisable && styles.disableView]}>
          {propsData?.title ? 'Update' : 'Add'}
        </Text>
      </TouchableOpacity>
    );
  }, [handleAddTask, propsData?.title, taskTitle]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => headerRight(),
      headerTitle: propsData?.title,
    });
  }, [headerRight, navigation, propsData?.title]);

  const SECTIONS_DATE_TIME: ISectionDateTime[] = useMemo(
    () => [
      {
        header: (
          <RowDateTime
            isActive={isDateOn}
            icon="calendar"
            type={RowDateTimeType.Date}
            value={getDateFromNow(
              dateTimeSelected.date,
              DATE_TIME_FORMAT.FULL_DATE,
            )}
            onChangeSection={onToggleDate}
          />
        ),
        content: (
          <DatePicker
            date={dateTimeSelected.date}
            mode="date"
            style={styles.centerView}
            onDateChange={onDateChange}
          />
        ),
      },
      {
        header: (
          <RowDateTime
            isActive={isTimeOn}
            icon="clockcircle"
            type={RowDateTimeType.Time}
            value={moment(dateTimeSelected.time).format('hh:mm')}
            onChangeSection={onToggleTime}
          />
        ),
        content: (
          <DatePicker
            date={dateTimeSelected.time}
            mode="time"
            style={styles.centerView}
            onDateChange={onTimeChange}
          />
        ),
      },
    ],
    [
      isDateOn,
      isTimeOn,
      dateTimeSelected.date,
      dateTimeSelected.time,
      onToggleDate,
      onDateChange,
      onToggleTime,
      onTimeChange,
    ],
  );

  const renderHeaderDateTime = (section: ISectionDateTime) => section.header;

  const renderContentDateTime = (section: ISectionDateTime) => section.content;

  const renderItemListDropdown = (item: IMyList, selected?: boolean) => {
    return (
      <View style={styles.viewListDropdown}>
        <View
          style={[styles.viewIconListDropdown, {backgroundColor: item.color}]}>
          <Icon.MaterialIcons
            name={item.icon}
            size={wp(4)}
            color={colors.WHITE}
          />
        </View>
        <Text style={styles.txtListDropdown}>{item.name || ''}</Text>
        {selected && (
          <Icon.AntDesign
            name="check"
            color={colors.PRIMARY_COLOR}
            size={wp(4)}
          />
        )}
      </View>
    );
  };

  return (
    <AppLayout>
      <ScrollView>
        <View style={styles.viewInput}>
          <TextInput
            placeholder="Title"
            style={[styles.input, styles.inputTitle]}
            multiline
            onChangeText={onChangeTaskTitle}
            defaultValue={propsData?.title}
          />
          <TextInput
            placeholder="Notes"
            style={[styles.input, styles.inputNote]}
            multiline
            onChangeText={onChangeNotes}
            defaultValue={propsData?.notes}
          />
        </View>
        <View style={[styles.viewInput, styles.mT5]}>
          <Accordion
            sections={SECTIONS_DATE_TIME}
            activeSections={activeSectionDateTime}
            renderHeader={renderHeaderDateTime}
            renderContent={renderContentDateTime}
            onChange={updateSectionDateTime}
            underlayColor={colors.LIGHT_GRAY}
          />
        </View>

        <View style={[styles.viewInput, styles.mT5]}>
          <Text style={styles.labelSelectList}>List</Text>
          <Dropdown
            data={appData.myLists || []}
            labelField="name"
            valueField="name"
            placeholder=""
            value={listSelected}
            style={styles.viewSelectList}
            onChange={onSelectList}
            selectedTextStyle={styles.txtListSelected}
            renderItem={renderItemListDropdown}
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default AddTask;
