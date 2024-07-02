import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native';
import { Link } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen () {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [confMdp, setConfMdp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Link href="/" asChild style={styles.backButton}>
        <AntDesign name="arrowleft" size={30} color="#F595F2" />
      </Link>
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/images/logo-transparent.png')}
          style={styles.image}
        />
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.description}>
          Inscrivez vous afin de pouvoir changer le cours de vos évènements !
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={styles.input}
          theme={{ roundness: 10 }} // Make the input rounded
        />
        <TextInput
          label="Mot de passe"
          value={mdp}
          onChangeText={(mdp) => setMdp(mdp)}
          style={styles.input}
          secureTextEntry
          theme={{ roundness: 10 }} // Make the input rounded
        />
        <TextInput
          label="Confirmer le mot de passe"
          value={confMdp}
          onChangeText={(confMdp) => setConfMdp(confMdp)}
          style={styles.input}
          secureTextEntry
          theme={{ roundness: 10 }} // Make the input rounded
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#EFB4E9"
          labelStyle={styles.buttonText}
          style={styles.button}
          onPress={() => {
            // Handle login logic
            console.log(email,mdp,confMdp)
          }}
        >
          Connexion
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#605790',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70, // Adjust padding to move content closer to the top
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20, // Ensure button is at the bottom
  },
  button: {
    width: '90%',
    marginVertical: 15,
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    padding: 5,
  },
  title: {
    fontFamily: 'PoppinsRegular',
    fontSize: 45,
    color: '#F595F2',
  },
  description: {
    fontFamily: 'PoppinsRegular',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
});

