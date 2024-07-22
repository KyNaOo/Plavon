// DateComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Tableau des noms des mois en français
const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

const DateMoi = () => {
    // Obtient la date actuelle
    const today = new Date();

    // Récupère le jour du mois
    const day = today.getDate().toString().padStart(2, '0'); // Ajoute un zéro si nécessaire pour avoir deux chiffres

    // Récupère le mois (index 0-11) et le transforme en nom du mois en français
    const monthName = months[today.getMonth()];

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>
                <Text style={styles.dayMonth}>{day}.{(today.getMonth() + 1).toString().padStart(2, '0')}</Text>
                {'\n'}
                <Text style={styles.monthName}>{monthName}</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,

    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    dayMonth: {
        fontSize: 48,
    },
    monthName: {
        fontSize: 48,
    },
});

export default DateMoi;
