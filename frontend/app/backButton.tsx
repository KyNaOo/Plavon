import React from 'react';
import { Link } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const BackButton = () => {
  return (
    <Link href={'/'} asChild style={styles.backButton}>
      <AntDesign name="arrowleft" size={30} color="#F595F2" />
    </Link>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1,
  },
});

export default BackButton;
