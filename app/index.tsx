import { Layout, Card, Text, Divider } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import BottomCosmetic from '@/components/BottomCosmetic';
import EmptySearchModal from '@/components/EmptySearchModal';
import SearchInput from '@/components/SearchInput';
import SearchOptions from '@/components/SortOptions';
import UserLists from '@/components/UserLists';
import data from '@/data/leaderboard.json';
import { formatUserEntries, searchForUsers } from '@/store/actionCreators';
import { getSearchedUser } from '@/store/selectors';

const Index = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [emptySearchModalVisible, setEmptySearchModalVisible] =
    useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [sortByName, setSortByName] = useState<'asc' | 'desc' | undefined>();
  const [sortByRank, setSortByRank] = useState<'asc' | 'desc' | undefined>();
  const [sortedUser, setSortedUser] = useState<IUser[] | undefined>();

  const dispatch: Dispatch<UserAction> = useDispatch();

  const searchedUser = useSelector(getSearchedUser);

  useEffect(() => {
    dispatch(formatUserEntries(Object.values(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchPerformed && searchedUser && searchedUser.length === 0) {
      setSearchPerformed(false);
      setTimeout(() => {
        // Delay setting the modal visible to ensure it's shown after the component re-renders
        setEmptySearchModalVisible(true);
      }, 200);
    } else {
      setEmptySearchModalVisible(false);
    }
  }, [searchedUser, searchPerformed]);

  const onSearchForUsers = () => {
    setSearchPerformed(true);
    setSortedUser(undefined);
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

  const toggleSortByName = (direction: 'asc' | 'desc') => {
    setSortByRank(undefined);
    setSortByName(direction);
    const sorted = searchedUser
      ? [...searchedUser].sort((a, b) => {
          return direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        })
      : undefined;
    setSortedUser(sorted);
  };

  const toggleSortByRank = (direction: 'asc' | 'desc') => {
    setSortByName(undefined);
    setSortByRank(direction);
    const sorted = searchedUser
      ? [...searchedUser].sort((a, b) => {
          // same score are listed alphabetically
          if (a.bananas === b.bananas) {
            return a.name.localeCompare(b.name);
          }
          return direction === 'asc' ? a.rank - b.rank : b.rank - a.rank;
        })
      : undefined;
    setSortedUser(sorted);
  };

  const onClearSort = () => {
    setSortedUser(undefined);
    setSortByName(undefined);
    setSortByRank(undefined);
  };

  return (
    <Layout style={styles().root} level="2">
      {!searchPerformed && (
        <View style={styles().backgroundContainer}>
          <Image
            source={require('@/assets/images/banana-win.png')}
            resizeMode="cover"
            style={styles().backgroundImage}
          />
        </View>
      )}

      <Card
        style={styles({ searchPerformed }).searchCard}
        appearance="filled"
        disabled={false}
      >
        {!searchPerformed && (
          <Text
            style={{
              fontSize: 18,
              fontWeight: 300,
              marginBottom: 20,
              letterSpacing: 0.7,
              lineHeight: 24,
            }}
          >
            Top Banana Bunch:{'\n'}A League of Legends
          </Text>
        )}
        <SearchInput
          keyword={keyword}
          onKeywordChange={onKeywordChange}
          onSearchForUsers={onSearchForUsers}
        />
        {searchPerformed && (
          <>
            <Divider style={styles().searchOptionsDivider} />
            <SearchOptions
              sortByName={sortByName}
              sortByRank={sortByRank}
              toggleSortByName={toggleSortByName}
              toggleSortByRank={toggleSortByRank}
              onClearSort={onClearSort}
            />
          </>
        )}
      </Card>

      {!searchPerformed && <BottomCosmetic />}

      {searchedUser && <UserLists data={sortedUser || searchedUser} />}

      <EmptySearchModal
        visible={emptySearchModalVisible}
        onClose={onEmptySearchModalClose}
      />
    </Layout>
  );
};

const styles = (props?: { searchPerformed: boolean }) =>
  StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'center',
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    backgroundImage: {
      width: '100%',
      height: 500,
    },
    searchCard: {
      marginHorizontal: 16,
      marginTop: props?.searchPerformed ? 70 : 0,
    },
    searchOptionsDivider: {
      marginTop: 10,
    },
  });

export default Index;
