import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import { Link,useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
export default function index () {
  const openmodal = () => {
    // Functionality for opening modal
  };

  const router = useRouter();
  const openPrivacyPolicy = () => {
    router.push('/PrivacyPolicy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/plavon_rose.png')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
      
        <Button 
        mode="contained" 
        buttonColor='#EFB4E9' 
        textColor='white' 
        labelStyle={styles.buttonText} 
        style={styles.button}
        onPress={()=>router.navigate('/login')}
        >
          Se connecter
        </Button>
        <Button 
        mode="contained" 
        buttonColor='white' 
        textColor='#F595F2' 
        labelStyle={styles.buttonText} 
        style={styles.button} 
        onPress={()=>router.navigate('/register')}
        >
          S'inscrire
        </Button>
      
      </View>
      <TouchableOpacity onPress={openPrivacyPolicy} style={styles.linkContainer}>
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

