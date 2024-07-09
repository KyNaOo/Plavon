import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Button, TextInput, Searchbar, Chip } from 'react-native-paper';

const randomNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry'];

export default function createGroup() {
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedNames, setSelectedNames] = useState(['']);

  const filteredNames = randomNames.filter(name => 
    name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedNames.includes(name)
  );

  const handleNameSelect = (name : string) => {
    setSelectedNames([...selectedNames, name]);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  const handleRemoveName = (name : string) => {
    setSelectedNames(selectedNames.filter(n => n !== name));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Nom du groupe"
          value={groupName}
          onChangeText={text => setGroupName(text)}
          style={styles.textInput}
        />
        <View style={styles.chipContainer}>
          {selectedNames.map(name => (
            <Chip 
              key={name} 
              onClose={() => handleRemoveName(name)}
              style={styles.chip}
            >
              {name}
            </Chip>
          ))}
        </View>
        <Searchbar
          placeholder="Cherche tes amis"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onFocus={() => setIsSearchFocused(true)}
          style={styles.searchBar}
        />
        {isSearchFocused && searchQuery && (
          <FlatList
            data={filteredNames}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => handleNameSelect(item)} style={styles.nameItem}>
                <Button>{item}</Button>
              </TouchableOpacity>
            )}
            keyExtractor={item => item}
            style={styles.nameList}
          />
        )}
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
    marginTop: '45%',
  },
  textInput: {
    marginBottom: 20,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    margin: 4,
  },
  searchBar: {
    marginBottom: 10,
  },
  nameList: {
    maxHeight: 200,
    backgroundColor: 'white',
  },
  nameItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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