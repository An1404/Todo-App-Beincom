import {Icon, colors, wp} from '@constants/vars';
import AppLayout from '@src/components/AppLayout';
import moment from 'moment';
import React, {useMemo} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import ActionBottom from './components/ActionBottom';
import Category, {CategoryProps} from './components/Category';
import List from './components/MyList';
import Search from './components/Search';
import {CategoryType} from './models';
import styles from './styles';
import useHome from './useHome';
const Home = () => {
  const {appData, gotoListDetail, gotoTaskCategory, handleDeleteList} =
    useHome();
  const LIST_CATEGORY: CategoryProps[] = useMemo(() => {
    const listTaskToday =
      appData.tasks?.filter(item => {
        if (!item?.dateTime) return false;
        return (
          moment(item.dateTime).isSame(moment(), 'day') && !item.completedAt
        );
      }) || [];
    return [
      {
        icon: <Icon.AwesSome5 name="tasks" size={wp(6)} color={colors.WHITE} />,
        name: CategoryType.ALL,
        total: appData.tasks?.filter(item => !item.completedAt)?.length || 0,
        backgroundIconColor: colors.BLACK,
        onPress: () => gotoTaskCategory(CategoryType.ALL),
      },
      {
        icon: (
          <View style={styles.iconToday}>
            <Text style={styles.txtToday}>{new Date().getDate()}</Text>
          </View>
        ),
        name: CategoryType.TODAY,
        total: listTaskToday.length,
        backgroundIconColor: colors.PRIMARY_COLOR,
        onPress: () => gotoTaskCategory(CategoryType.TODAY),
      },
      {
        icon: <Icon.Entypo name="check" size={wp(6)} color={colors.WHITE} />,
        name: CategoryType.COMPLETED,
        total: appData.tasks?.filter(item => item.completedAt)?.length || 0,
        backgroundIconColor: colors.GREEN,
        onPress: () => gotoTaskCategory(CategoryType.COMPLETED),
      },
    ];
  }, [appData, gotoTaskCategory]);

  return (
    <AppLayout safeTop>
      {/* <Search /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.viewContainer}>
        <View style={styles.viewCategory}>
          {LIST_CATEGORY.map((item, index) => (
            <Category {...item} key={index.toString()} />
          ))}
        </View>
        <Text style={styles.txtMyList}>My Lists</Text>
        <View style={styles.viewMyList}>
          <SwipeListView
            data={appData.myLists}
            renderItem={data => {
              const total = appData.tasks?.filter(
                task => task.listType === data.item.name && !task.completedAt,
              ).length;
              return (
                <List
                  key={data.item.name}
                  {...data.item}
                  total={total}
                  lastIndex={data.index + 1 === appData.myLists?.length}
                  onPress={() =>
                    gotoTaskCategory(CategoryType.MY_LIST, data.item.key)
                  }
                />
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.viewSwipe}
                  activeOpacity={0.8}
                  onPress={() => gotoListDetail(data, rowMap)}>
                  <Icon.AntDesign
                    name="infocirlce"
                    size={wp(5)}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.viewSwipe, styles.viewDelete]}
                  activeOpacity={0.8}
                  onPress={() => handleDeleteList(data.item)}>
                  <Icon.AntDesign
                    name="delete"
                    size={wp(5)}
                    color={colors.WHITE}
                  />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe
            rightOpenValue={-wp(30)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <ActionBottom />
    </AppLayout>
  );
};

export default Home;
