// DayComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayComponent = () => {
    // Liste des jours de la semaine en français
    const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    // Obtient la date actuelle
    const today = new Date();

    // Récupère le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    const dayName = daysOfWeek[today.getDay()];

    return (
        <View style={styles.container}>
            <Text style={styles.dayText}> {dayName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,

    },
    dayText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default DayComponent;
