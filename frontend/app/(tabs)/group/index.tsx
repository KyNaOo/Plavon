import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, Platform, ScrollView } from 'react-native';
import { Card, Chip, Searchbar, TextInput, IconButton, Button } from 'react-native-paper';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import FullScreenModal from '@/components/FullScreenModal';

interface FriendData {
  name: string;
}

interface CardData {
  title: string;
  color: string;
}

export default function GroupScreen() {
  const friendData: FriendData[] = [
    { name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }, 
    { name: 'David' }, { name: 'Emma' }, { name: 'Frank' }, 
    { name: 'Grace' }, { name: 'Henry' }
  ];

  const cardData: CardData[] = [
    { title: "Group 1", color: Colors.light.iconColor },
    { title: "Group 2", color: Colors.light.purpleBackground },
    { title: "Group 3", color: "#9999FF" },
    { title: "Group 4", color: Colors.light.iconColor },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchQuery('');
    setSelectedNames([]);
    setGroupName('');
  };

  const filteredFriends = friendData.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedNames.includes(friend.name)
  );

  const handleNameSelect = useCallback((name: string) => {
    setSelectedNames(prev => [...prev, name]);
  }, []);

  const handleRemoveName = useCallback((name: string) => {
    setSelectedNames(prev => prev.filter(n => n !== name));
  }, []);

  const renderCard = ({ item }: { item: CardData }) => (
    <Card style={[styles.card, { backgroundColor: item.color }]}>
      <Card.Content>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </Card.Content>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Vos groupes</Text>
      <IconButton
        icon="plus-circle"
        size={36}
        iconColor={"#f595f2"}
        onPress={() => setIsModalVisible(true)}
      />
    </View>
  );

  const renderModalContent = () => (
    <ScrollView style={styles.modalScrollView}>
      <TextInput
        label="Nom du groupe"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.textInput}
      />
      <View style={styles.chipContainer}>
        {selectedNames.map((name) => (
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
        style={styles.searchBar}
      />
      {filteredFriends.map((item) => (
        <Card key={item.name} style={styles.friendCard} onPress={() => handleNameSelect(item.name)}>
          <Card.Content>
            <Text style={styles.friendName}>{item.name}</Text>
          </Card.Content>
        </Card>
      ))}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleCloseModal}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Create Group
        </Button>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="transparent" translucent />
      <FlatList
        data={cardData}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.content}
        ListHeaderComponent={renderHeader}
      />
      <FullScreenModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        title='Créer un groupe'
      >
        {renderModalContent()}
      </FullScreenModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'PoppinsRegular',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    color: 'white',
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
  friendCard: {
    marginBottom: 8,
  },
  friendName: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    backgroundColor:Colors.light.iconColor
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  modalScrollView: {
    flex: 1,
  },
});
