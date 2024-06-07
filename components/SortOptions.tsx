import { Button } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import SortRow from './SortRow';

interface SearchOptionsProps {
  sortParams: SortParams;
  toggleSortByName: (direction: 'asc' | 'desc') => void;
  toggleSortByRank: (direction: 'asc' | 'desc') => void;
  onClearSort: () => void;
}

const SearchOptions: React.FC<SearchOptionsProps> = ({
  sortParams,
  toggleSortByName,
  toggleSortByRank,
  onClearSort,
}) => {
  const [nameSortDirection, setNameSortDirection] = useState<
    'asc' | 'desc' | undefined
  >();
  const [rankSortDirection, setRankSortDirection] = useState<
    'asc' | 'desc' | undefined
  >();

  useEffect(() => {
    switch (sortParams) {
      case 'name_asc':
        setNameSortDirection('asc');
        setRankSortDirection(undefined);
        break;
      case 'name_desc':
        setNameSortDirection('desc');
        setRankSortDirection(undefined);
        break;
      case 'rank_asc':
        setRankSortDirection('asc');
        setNameSortDirection(undefined);
        break;
      case 'rank_desc':
        setRankSortDirection('desc');
        setNameSortDirection(undefined);
        break;
    }
  }, [sortParams]);

  return (
    <View style={styles.searchOptionsWrapper}>
      <SortRow
        label="Sort by Name"
        sortDirection={nameSortDirection}
        onSortAsc={() => toggleSortByName('asc')}
        onSortDesc={() => toggleSortByName('desc')}
      />
      <SortRow
        label="Sort by Rank"
        sortDirection={rankSortDirection}
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
