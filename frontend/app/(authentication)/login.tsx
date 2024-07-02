import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import BackButton from '../backButton';

export default function LoginScreen () {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <BackButton/>
          <View style={styles.topContainer}>
            <Image
              source={require('../../assets/images/logo-transparent.png')}
              style={styles.image}
            />
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.description}>
              Connectez vous à Plavon et planifiez tous vos évènements !
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              theme={{ roundness: 10 }}
            />
            <TextInput
              label="Mot de passe"
              value={mdp}
              onChangeText={(mdp) => setMdp(mdp)}
              style={styles.input}
              secureTextEntry
              theme={{ roundness: 10 }}
            />
            <Link href="/register" asChild>
              <Text style={styles.linkText}>Pas encore de compte?</Text>
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              buttonColor="#EFB4E9"
              labelStyle={styles.buttonText}
              style={styles.button}
              onPress={() => {
                console.log(email,mdp)
              }}
            >
              Connexion
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#605790',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 1,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
  },
  middleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    paddingBottom: 20,
    marginTop: 20,
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
  linkText: {
    color: '#F595F2',
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsRegular',
  },
});