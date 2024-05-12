import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {Icon, colors, wp} from '@constants/vars';
import Search from './components/Search';
import Category, {CategoryProps} from './components/Category';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActionBottom from './components/ActionBottom';
import List from './components/MyList';
const Home = () => {
  const LIST_CATEGORY: CategoryProps[] = useMemo(
    () => [
      {
        icon: <Icon.AwesSome5 name="tasks" size={wp(6)} color={colors.WHITE} />,
        name: 'All',
        total: 0,
        backgroundIconColor: colors.BLACK,
      },
      {
        icon: (
          <View style={styles.iconToday}>
            <Text style={styles.txtToday}>{new Date().getDate()}</Text>
          </View>
        ),
        name: 'Today',
        total: 0,
        backgroundIconColor: colors.PRIMARY_COLOR,
      },
      {
        icon: <Icon.Entypo name="check" size={wp(6)} color={colors.WHITE} />,
        name: 'Completed',
        total: 0,
        backgroundIconColor: colors.GREEN,
      },
    ],
    [],
  );

  return (
    <SafeAreaView style={styles.root}>
      <Search />
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
          <List name="asd" color="red" total={0} lastIndex />
        </View>
      </ScrollView>
      <ActionBottom />
    </SafeAreaView>
  );
};

export default Home;
