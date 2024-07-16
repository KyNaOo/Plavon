import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Card, Chip, Searchbar, TextInput, IconButton, Button } from 'react-native-paper';
import CustomModal from '@/components/Modal';
import Colors from '@/constants/Colors';

interface CardData {
    title: string;
    color: string;
}

export default function GroupScreen() {
    const randomNames: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry'];
    const [isModalVisible, setIsModalVisible] = useState(false);
    const cardData: CardData[] = [
        { title: "Group 1", color: Colors.light.iconColor },
        { title: "Group 2", color: Colors.light.purpleBackground },
        { title: "Group 3", color: "#9999FF" },
        { title: "Group 4", color: Colors.light.iconColor },
    ];
    const [groupName, setGroupName] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedNames, setSelectedNames] = useState<string[]>([]);

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSearchQuery('');
        setSelectedNames([]);
        setGroupName('');
    };

    const filteredNames = randomNames.filter(name => 
        name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedNames.includes(name)
    );
    
    const handleNameSelect = useCallback((name: string) => {
        setSelectedNames(prev => [...prev, name]);
        setSearchQuery('');
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
            <CustomModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                title='Créer un groupe'
            >
                <TextInput
                    label="Nom du groupe"
                    value={groupName}
                    onChangeText={setGroupName}
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
                    style={styles.searchBar}
                />
                {searchQuery && (
                    <FlatList
                        data={filteredNames}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => handleNameSelect(item)} style={styles.nameItem}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item}
                        style={styles.nameList}
                    />
                )}
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
            </CustomModal>
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
    nameList: {
        maxHeight: 150,
    },
    nameItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        paddingVertical: 8,
    },
    buttonText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
    },
});
