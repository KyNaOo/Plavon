import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {IconButton} from "react-native-paper";

const EventListScreen: React.FC = () => {
    const events = [
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Famille', description: 'Nouveau Plavon : Sortie au parc d\'attraction', date: '26/08/2024 15h-17h' },
        { title: 'Le groupe des ventriloques de l\'ombre', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
        { title: 'Les foufous de sauchaux', description: 'Nouveau Plavon : Basket', date: '26/08/2024 15h-17h' },
    ];

    const handleCardPress = (event: { title: string; description: string; date: string }) => {
        Alert.alert('Event Clicked', `You clicked on ${event.title}`);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.screenTitle}>Mes notifications</Text>
            {events.map((event, index) => (
                <TouchableOpacity key={index} style={styles.card} onPress={() => handleCardPress(event)}>
                    <View style={styles.cardContent}>
                        <Text style={styles.title}>{event.title}</Text>
                        <Text style={styles.separator}>|</Text>
                        <View style={styles.details}>
                            <Text style={styles.description}>{event.description}</Text>
                            <Text style={styles.date}>{event.date}</Text>
                        </View>
                        <View style={styles.arrow}>
                            <IconButton
                                icon="chevron-right"
                                size={24}
                                onPress={() => handleCardPress(event)}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <View style={styles.footerSpacer} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 2,
    },
    separator: {
        fontSize: 24,
        marginHorizontal: 8,
    },
    details: {
        flex: 3,
    },
    description: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
    },
    arrow: {
        flex: 1,
        alignItems: 'flex-end',
    },
    footerSpacer: {
        height: 32,
    },
});

export default EventListScreen;
