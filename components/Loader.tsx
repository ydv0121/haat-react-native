import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { useLoader } from '../context/LoaderContext'
import { Colors } from '@constants/Colors';

const Loader = () => {
  const { isLoading } = useLoader();

  return (
    <Modal transparent={true} animationType="none" visible={isLoading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.red} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default Loader;