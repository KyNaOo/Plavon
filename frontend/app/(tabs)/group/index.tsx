import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { white } from 'react-native-paper/src/styles/themes/v2/colors';
import CustomModal from '@/components/Modal';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import Colors from '@/constants/Colors';

export default function GroupScreen() {
    const cardData = [
        { title: "Group 1", color: Colors.light.iconColor },
        { title: "Group 2", color: Colors.light.purpleBackground },
        { title: "Group 3", color: "#9999FF" },
        { title: "Group 4", color: Colors.light.iconColor },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Vos groupes</Text>
                <Ionicons name="add-circle" size={36} color="#f595f2" />
            </View>
            <ScrollView style={styles.content}>
                {cardData.map((card, index) => (
                    <Card key={index} style={[styles.card, { backgroundColor: card.color }]}>
                        <Card.Content>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
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
        flex: 1,
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
});