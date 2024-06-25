import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageScreen() {
    return (
        <View style={styles.container}>
            <Text>Massage Page</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
