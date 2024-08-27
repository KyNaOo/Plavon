import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar, Card} from 'react-native-paper';


type CardItemProps = {
    title: string;
    startTime: Date;
    endTime: Date;
};

const getRandomColor = () => {
    const letters = ['FBA5A0', 'FFA0B5', 'FFE3D8', '0C6E74 ', 'd196a2', 'bfaccd', 'bfaccd'];

    const randomIndex = Math.floor(Math.random() * letters.length);

    const color = '#' + letters[randomIndex];

    return color;
};

const CardItem: React.FC<CardItemProps> = ({title, startTime, endTime}) => {

    const cardBackgroundColor = getRandomColor();

    const start = new Date(startTime);
    const end = new Date(endTime);

    return (
        <Card style={[styles.card, {backgroundColor: cardBackgroundColor}]}>
            <Card.Content>
                <View style={styles.row}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.avatarContainer}>
                        <Avatar.Text size={24} label="XD"/>
                        <Avatar.Text size={24} label="XD"/>
                    </View>
                </View>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.timeText}>{start.toLocaleTimeString('fr').slice(0, -3)}</Text>
                        <Text style={styles.label}>Start</Text>
                    </View>
                    <View>
                        <Text style={styles.timeText}>{end.toLocaleTimeString('fr').slice(0, -3)}</Text>
                        <Text style={styles.label}>End</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    },
    avatarContainer: {
        flexDirection: 'row',
    },
    timeText: {
        paddingBottom: 5,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 12,
    },
});

export default CardItem;
