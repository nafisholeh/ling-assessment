import { Modal, Button, Card, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';

interface EmptySearchModalProps {
  visible: boolean;
  onClose: () => void;
}

const EmptySearchModal: React.FC<EmptySearchModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onClose}
    >
      <Card disabled={true}>
        <Text>
          This user name does not exist! Please specify an existing user name!
        </Text>
        <Button onPress={onClose}>DISMISS</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default EmptySearchModal;
