import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Card, Chip, Searchbar, TextInput, IconButton, Button } from 'react-native-paper';
import Colors from '@/constants/Colors';
import FullScreenModal from '@/components/FullScreenModal';
import api from '@/services/api';
import { useAuth } from '@/services/AuthContext';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
}

interface CardData {
  title: string;
  color: string;
}

export default function GroupScreen() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {getToken} = useAuth();

  const cardData: CardData[] = [
    { title: "Group 1", color: Colors.light.iconColor },
    { title: "Group 2", color: Colors.light.purpleBackground },
    { title: "Group 3", color: "#9999FF" },
    { title: "Group 4", color: Colors.light.iconColor },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = await getToken();
    
      const response = await api.get('/user/except', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSearchQuery('');
    setSelectedUsers([]);
    setGroupName('');
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) && 
    !selectedUsers.some(selectedUser => selectedUser.id === user.id)
  );

  const handleUserSelect = useCallback((user: UserData) => {
    setSelectedUsers(prev => [...prev, user]);
  }, []);

  const handleRemoveUser = useCallback((userId: string) => {
    setSelectedUsers(prev => prev.filter(user => user.id !== userId));
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScrollView}>
      <TextInput
        label="Nom du groupe"
        value={groupName}
        onChangeText={setGroupName}
        style={styles.textInput}
      />
      <View style={styles.chipContainer}>
        {selectedUsers.map((user) => (
          <Chip
            key={user.id}
            onClose={() => handleRemoveUser(user.id)}
            style={styles.chip}
          >
            {`${user.firstName} ${user.lastName}`}
          </Chip>
        ))}
      </View>
      <Searchbar
        placeholder="Cherche tes amis"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      {isLoading ? (
        <Text>Loading users...</Text>
      ) : (
        filteredUsers.map((user) => (
          <Card key={user.id} style={styles.friendCard} onPress={() => handleUserSelect(user)}>
            <Card.Content>
              <Text style={styles.friendName}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.friendEmail}>{user.email}</Text>
            </Card.Content>
          </Card>
        ))
      )}
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
  },
  chip: {
    margin: 4,
  },
  searchBar: {
    marginBottom: 10,
    borderRadius: 8,
  },
  friendCard: {
    marginBottom: 8,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.light.iconColor
  },
  friendName: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
    color:'white'
  },
  friendEmail: {
    fontFamily: 'PoppinsRegular',
    fontSize: 12,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    backgroundColor: Colors.light.iconColor
  },
  buttonText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  modalScrollView: {
    flex: 1,
  },
});