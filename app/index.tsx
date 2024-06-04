import {
  Layout,
  List,
  Button,
  Card,
  Input,
  Icon,
  Text,
} from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import data from '@/data/leaderboard.json';
import { setUsers, setSearchKeyword } from '@/store/actionCreators';
import { getSearchedUser } from '@/store/selectors';

const Index = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const dispatch: Dispatch<UserAction> = useDispatch();

  const searchedUser = useSelector(getSearchedUser);

  useEffect(() => {
    dispatch(setUsers(Object.values(data)));
  }, [dispatch]);

  const renderItem = ({ item }: { item: IUser }): React.ReactElement => {
    return (
      <Card style={styles.item} status="basic">
        <Text>{item.name}</Text>
        <Text>{item.bananas}</Text>
      </Card>
    );
  };

  const searchForUser = () => {
    if (keyword) {
      dispatch(setSearchKeyword(keyword));
    }
  };

  const onKeywordChange = (_keyword: string) => {
    setKeyword(_keyword);
  };

  return (
    <Layout style={styles.root}>
      <View style={styles.searchContainer}>
        <Input
          style={styles.searchBox}
          accessoryLeft={<Icon animation="zoom" name="search" />}
          placeholder="User name…"
          onChangeText={onKeywordChange}
          value={keyword}
        />
        <Button onPress={searchForUser}>Search</Button>
      </View>
      {searchedUser && (
        <List
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={searchedUser}
          renderItem={renderItem}
        ></List>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    marginRight: 10,
  },
  list: {},
  listContainer: {},
  item: {},
});

export default Index;
