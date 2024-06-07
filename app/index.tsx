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
import {
  formatUserEntries,
  searchForUsers,
  sortSearchResults,
} from '@/store/actionCreators';
import {
  getSearchedUser,
  getSortParams,
  getSortedUser,
} from '@/store/selectors';

const Index = () => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [emptySearchModalVisible, setEmptySearchModalVisible] =
    useState<boolean>(false);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const dispatch: Dispatch<UserAction> = useDispatch();

  const searchedUser = useSelector(getSearchedUser);
  const sortedUser = useSelector(getSortedUser);
  const sortParams = useSelector(getSortParams);

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
    dispatch(sortSearchResults(null));
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
    dispatch(sortSearchResults(`name_${direction}`));
  };

  const toggleSortByRank = (direction: 'asc' | 'desc') => {
    dispatch(sortSearchResults(`rank_${direction}`));
  };

  const onClearSort = () => {
    dispatch(sortSearchResults(null));
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
              sortParams={sortParams}
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
