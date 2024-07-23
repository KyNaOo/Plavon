
import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

interface Step1Props {
  email: string;
  setEmail: (email: string) => void;
  mdp: string;
  setMdp: (mdp: string) => void;
  confMdp: string;
  setConfMdp: (confMdp: string) => void;
}

interface Step2Props {
  bio: string;
  setBio: (bio: string) => void;
}

export const Step1: React.FC<Step1Props> = ({ email, setEmail, mdp, setMdp, confMdp, setConfMdp }) => (
  <>
    <TextInput
      label="Email"
      value={email}
      onChangeText={setEmail}
      style={styles.input}
      theme={{ roundness: 10 }}
    />
    <TextInput
      label="Mot de passe"
      value={mdp}
      onChangeText={setMdp}
      style={styles.input}
      secureTextEntry
      theme={{ roundness: 10 }}
    />
    <TextInput
      label="Confirmer le mot de passe"
      value={confMdp}
      onChangeText={setConfMdp}
      style={styles.input}
      secureTextEntry
      theme={{ roundness: 10 }}
    />
  </>
);

export const Step2: React.FC<Step2Props> = ({ bio, setBio }) => (
  <TextInput
    label="Bio"
    value={bio}
    onChangeText={setBio}
    style={styles.input}
    multiline
    numberOfLines={4}
    theme={{ roundness: 10 }}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '80%',
    marginBottom: 20,
  },
});