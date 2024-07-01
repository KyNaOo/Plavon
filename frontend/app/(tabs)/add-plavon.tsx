import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function AddPlavonScreen() {
    return (
        <View style={styles.container}>
            <Text>Add Plavon page</Text>
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
