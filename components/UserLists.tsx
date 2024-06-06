import { List, Card, Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface IUser {
  rank: number;
  name: string;
  bananas: number;
  isHighlighted?: boolean;
}

interface ListComponentProps {
  data: IUser[];
}

const renderItem = ({ item }: { item: IUser }): React.ReactElement => {
  return (
    <Card status={item.isHighlighted ? 'success' : 'basic'}>
      <View style={styles.itemWrapper}>
        <Text category="h1">{item.rank}</Text>
        <View style={styles.itemInfo}>
          <Text category="s1" style={styles.name}>
            {item.name}
          </Text>
          <Text category="h6">{item.bananas}</Text>
        </View>
      </View>
    </Card>
  );
};

const UserLists: React.FC<ListComponentProps> = ({ data }) => {
  return (
    <List
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={data}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {},
  listContainer: {
    marginTop: 23,
    paddingBottom: 60,
    marginHorizontal: 13,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemInfo: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  name: {
    letterSpacing: 0.7,
    fontStyle: 'italic',
  },
});

export default UserLists;
