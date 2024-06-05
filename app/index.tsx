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

import EmptySearchModal from '@/components/EmptySearchModal';
import data from '@/data/leaderboard.json';
import { formatUserEntries, searchForUsers } from '@/store/actionCreators';
import { getSearchedUser } from '@/store/selectors';

const Index = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [emptySearchModalVisible, setEmptySearchModalVisible] =
    useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const dispatch: Dispatch<UserAction> = useDispatch();

  const searchedUser = useSelector(getSearchedUser);

  useEffect(() => {
    dispatch(formatUserEntries(Object.values(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchPerformed && searchedUser && searchedUser.length === 0) {
      setEmptySearchModalVisible(true);
    } else {
      setEmptySearchModalVisible(false);
    }
  }, [searchedUser, searchPerformed]);

  const renderItem = ({ item }: { item: IUser }): React.ReactElement => {
    return (
      <Card
        style={styles.item}
        status={item.isHighlighted ? 'success' : 'basic'}
      >
        <Text>{item.rank}</Text>
        <Text>{item.name}</Text>
        <Text>{item.bananas}</Text>
      </Card>
    );
  };

  const onSearchForUsers = () => {
    setSearchPerformed(true);
    if (keyword) {
      dispatch(searchForUsers(keyword));
    }
  };

  const onKeywordChange = (_keyword: string) => {
    setKeyword(_keyword);
  };

  const onEmptySearchModalClose = () => {
    setEmptySearchModalVisible(false);
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
        <Button onPress={onSearchForUsers}>Search</Button>
      </View>
      {searchedUser && (
        <List
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={searchedUser}
          renderItem={renderItem}
        ></List>
      )}
      <EmptySearchModal
        visible={emptySearchModalVisible}
        onClose={onEmptySearchModalClose}
      />
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
