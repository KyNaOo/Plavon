import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, TextInput, Searchbar } from 'react-native-paper';

export default function createGroup() {
  const [groupName, setGroupName] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Nom du groupe"
          value={groupName}
          onChangeText={text => setGroupName(text)}
          style={styles.textInput}
        />
    <Searchbar
      placeholder="Cherche tes amis"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          buttonColor='#EFB4E9' 
          textColor='white' 
          labelStyle={styles.buttonText} 
          style={styles.button}
          onPress={() => console.log("pressed")}
        >
          Créer
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#605790',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginTop: '45%', // Adjust this value to move inputs further down
  },
  textInput: {
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  button: {
    paddingVertical: 8,
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
});