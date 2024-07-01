import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';

const index = () => {
  const openmodal = () => {
    // Functionality for opening modal
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/plavon_rose.png')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
      <Link href="/login" asChild>
        <Button mode="contained" buttonColor='#EFB4E9' textColor='white' labelStyle={styles.buttonText} style={styles.button}>
          Se connecter
        </Button>
        </Link>
        <Button mode="contained" buttonColor='white' textColor='#F595F2' labelStyle={styles.buttonText} style={styles.button}>
          S'inscrire
        </Button>
      </View>
      <TouchableOpacity onPress={openmodal} style={styles.linkContainer}>
        <Text style={styles.linkText}>Politique de confidentialité</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#605790',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300, // Adjust the width as needed
    height: 300, // Adjust the height as needed
    resizeMode: 'contain', // Ensure the image scales uniformly
    marginBottom: 20, // Add some margin below the image if needed
  },
  buttonContainer: {
    width: '50%',
    marginBottom: 20,
  },
  button: {
    marginVertical: 15,
  },
  linkContainer: {
    position: 'absolute',
    bottom: 20,
  },
  linkText: {
    color: '#F595F2',
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsRegular',
    marginBottom:25
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
});

export default index;
