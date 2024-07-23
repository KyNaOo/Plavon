import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {Link, router} from 'expo-router';
import {Button, HelperText, Icon, Snackbar, TextInput} from 'react-native-paper';
import BackButton from '@/components/backButton';
import Colors from '@/constants/Colors';
import api from "@/services/api";
import {useAuth} from "@/services/AuthContext";

type error = {
  "message": string[];
  "error": string;
  "statusCode": number;
}
export default function LoginScreen () {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [error, setError] = useState({
    "message": '',
    "error": '',
    "statusCode": 401
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {saveToken} = useAuth();

  const dismissError = () => {
    setIsError(false);
    setError({
      "message": '',
      "error": '',
      "statusCode": 401
    })
  }

  const login = async () => {
    setIsLoading(true)
    await api.post('/auth/login', {
      email: email,
      password: mdp
    }).then(response => {
      if (response.status === 200) {
        setIsLoading(false)
        saveToken(response.data.accessToken);
        router.navigate('/home')
      }
    }).catch(error => {
      setIsLoading(false)
      console.log(JSON.parse(error.request.response))
      setError(JSON.parse(error.request.response))
      setIsError(true)
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <BackButton href='/'/>
          <Snackbar
              visible={isError}
              onIconPress={dismissError}
              onDismiss={dismissError}
              style={styles.snackBar}
              duration={3000}
          >
            {error.message[0]}
          </Snackbar>
          <View style={styles.topContainer}>
            <Image
              source={require('@/assets/images/logo-transparent.png')}
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
              theme={{ roundness: 5 }}
            />
            <TextInput
              label="Mot de passe"
              value={mdp}
              onChangeText={(mdp) => setMdp(mdp)}
              style={styles.input}
              secureTextEntry
              theme={{ roundness: 5 }}
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
              onPress={login}
              loading={isLoading}
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
    backgroundColor: Colors.light.purpleBackground,
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
    color: Colors.light.itemBackground,
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
    color: Colors.light.itemBackground,
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsRegular',
  },
  snackBar: {
    width: '100%',
    alignSelf: 'center',
    marginLeft: 50
  }
});