import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import Form from './Form';
import { ScrollView } from 'react-native-gesture-handler';

export default function AddPlavonScreen() {
    return (
        <View style={styles.container}>
            <Title style={{ marginTop: 20, paddingLeft: 20, fontWeight: 'bold' }}>Add Plavon page</Title>

            <Form />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
