import { Button, Icon, Input } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SearchInputWrapperProps {
  keyword: string | undefined;
  onKeywordChange: (keyword: string) => void;
  onSearchForUsers: () => void;
}

const SearchInput: React.FC<SearchInputWrapperProps> = ({
  keyword,
  onKeywordChange,
  onSearchForUsers,
}) => {
  return (
    <View style={styles.searchInputWrapper}>
      <Input
        style={styles.searchBox}
        textStyle={{ letterSpacing: 0.7 }}
        accessoryLeft={<Icon animation="zoom" name="search" />}
        placeholder="User name…"
        onChangeText={onKeywordChange}
        value={keyword}
        size="large"
      />
      <Button
        onPress={onSearchForUsers}
        style={styles.searchButton}
        size="large"
      >
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    flex: 4,
    marginRight: 16,
  },
  searchButton: {
    flex: 1,
    letterSpacing: 2,
  },
});

export default SearchInput;
