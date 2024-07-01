import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');

  return (
    <SafeAreaView style={styles.container}>
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
          theme={{ roundness: 5 }} // Make the input rounded
        />
        <TextInput
          label="Mot de passe"
          value={mdp}
          onChangeText={(mdp) => setMdp(mdp)}
          style={styles.input}
          secureTextEntry
          theme={{ roundness: 5 }} // Make the input rounded
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
    marginBottom:20
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
  },
  input: {
    width: '80%',
    marginBottom: 40,
  },
});

export default Login;
