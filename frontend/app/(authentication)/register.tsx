import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Button, Snackbar } from 'react-native-paper';
import BackButton from '@/components/backButton';
import Colors from '@/constants/Colors';
import { Step1, Step2 } from './registerSteps';
import api from '@/services/api';
import { useAuth } from '@/services/AuthContext';

type error = {
  "message": string[];
  "error": string;
  "statusCode": number;
};

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [confMdp, setConfMdp] = useState('');
  const [bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    "message": '',
    "error": '',
    "statusCode": 400,
  });
  const { saveToken } = useAuth();

  const dismissError = () => {
    setIsError(false);
    setError({
      "message": '',
      "error": '',
      "statusCode": 400,
    });
  };

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const register = async () => {
    setIsLoading(true);

    // Validate the password confirmation
    if (mdp !== confMdp) {
      setError({
        "message": "Passwords do not match",
        "error": "Validation Error",
        "statusCode": 400,
      });
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const requestBody = {
      email: email,
      password: mdp,
      lastName: name,
      firstName: prenom,
      bio: bio,
    };

    const response = await api.post('/auth/register', requestBody)
      .then((response) => response)
      .catch((error) => error);

    if (response.status === 200) {
      await saveToken(response.data.access_token);
      setIsLoading(false);
      router.navigate('/home');
    } else {
      setIsLoading(false);
      setError(JSON.parse(response.request.response));
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <BackButton href="/" />
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
            {currentStep === 1 && (
              <>
                <Text style={styles.title}>Inscription</Text>
                <Text style={styles.description}>
                  Inscrivez vous afin de pouvoir changer le cours de vos évènements !
                </Text>
              </>
            )}
          </View>
          <View style={styles.middleContainer}>
            {currentStep === 1 ? (
              <Step1
                email={email}
                setEmail={setEmail}
                mdp={mdp}
                setMdp={setMdp}
                confMdp={confMdp}
                setConfMdp={setConfMdp}
              />
            ) : (
              <Step2
                bio={bio}
                setBio={setBio}
                name={name}
                setName={setName}
                prenom={prenom}
                setPrenom={setPrenom}
              />
            )}
            <Link href="/login" asChild>
              <Text style={styles.linkText}>Vous avez déjà un compte?</Text>
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            {currentStep > 1 && (
              <Button
                mode="contained"
                buttonColor="white"
                labelStyle={styles.buttonText}
                textColor="#EFB4E9"
                style={styles.button}
                onPress={prevStep}
              >
                Précédent
              </Button>
            )}
            <Button
              mode="contained"
              buttonColor="#EFB4E9"
              labelStyle={styles.buttonText}
              style={styles.button}
              onPress={currentStep === 2 ? register : nextStep}
              loading={isLoading}
            >
              {currentStep === 2 ? "S'inscrire" : 'Suivant'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '45%',
    marginVertical: 15,
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    padding: 5,
  },
  linkText: {
    color: Colors.light.itemBackground,
    textDecorationLine: 'underline',
    fontFamily: 'PoppinsRegular',
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
  snackBar: {
    width: '100%',
    alignSelf: 'center',
    marginLeft: 50
  },
});
