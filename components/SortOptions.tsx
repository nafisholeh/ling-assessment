import { Button } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import SortRow from './SortRow';

interface SearchOptionsProps {
  sortByName: 'asc' | 'desc' | undefined;
  sortByRank: 'asc' | 'desc' | undefined;
  toggleSortByName: (direction: 'asc' | 'desc') => void;
  toggleSortByRank: (direction: 'asc' | 'desc') => void;
  onClearSort: () => void;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({
  sortByName,
  sortByRank,
  toggleSortByName,
  toggleSortByRank,
  onClearSort,
}) => {
  return (
    <View style={styles.searchOptionsWrapper}>
      <SortRow
        label="Sort by Name"
        sortDirection={sortByName}
        onSortAsc={() => toggleSortByName('asc')}
        onSortDesc={() => toggleSortByName('desc')}
      />
      <SortRow
        label="Sort by Rank"
        sortDirection={sortByRank}
        onSortAsc={() => toggleSortByRank('asc')}
        onSortDesc={() => toggleSortByRank('desc')}
      />
      <Button appearance="outline" status="basic" onPress={onClearSort}>
        Clear sort
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  searchOptionsWrapper: {
    marginVertical: 10,
  },
});

export default SearchOptions;
