import { Text } from '@ui-kitten/components';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const BottomCosmetic: React.FC = () => {
  return (
    <View style={styles.bottomContainer}>
      <Text style={styles.footerText}>Congratulations to the winners!</Text>
      <Image
        source={require('@/assets/images/trophy.png')}
        resizeMode="contain"
        style={styles.trophyImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 150,
    marginTop: 20,
    alignItems: 'center',
    opacity: 0.4,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 0.7,
  },
  trophyImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});

export default BottomCosmetic;
