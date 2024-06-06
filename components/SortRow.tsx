import { Button, Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface SortRowProps {
  label: string;
  sortDirection: 'asc' | 'desc' | undefined;
  onSortAsc: () => void;
  onSortDesc: () => void;
}

const SortRow: React.FC<SortRowProps> = ({
  label,
  sortDirection,
  onSortAsc,
  onSortDesc,
}) => {
  return (
    <View style={styles.sortRow}>
      <Text style={styles.sortLabel}>{label}</Text>
      <Button
        onPress={onSortAsc}
        appearance={sortDirection === 'asc' ? 'filled' : 'ghost'}
        status="basic"
        size="small"
        accessoryLeft={<Icon name={'arrowhead-up-outline'} />}
        style={styles.sortButton}
      />
      <Button
        onPress={onSortDesc}
        appearance={sortDirection === 'desc' ? 'filled' : 'ghost'}
        status="basic"
        size="small"
        accessoryLeft={<Icon name={'arrowhead-down-outline'} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  sortLabel: {
    marginRight: 20,
  },
  sortButton: {
    marginRight: 20,
  },
});

export default SortRow;
