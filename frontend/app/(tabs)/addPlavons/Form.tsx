import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';


const MyForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [group, setGroup] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}  // Ajuste cette valeur selon les besoins
        >
            <ScrollView style={styles.container}>

                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    style={styles.input}
                />
                <TextInput
                    label="Start Time"
                    value={startTime}
                    onChangeText={text => setStartTime(text)}
                    style={styles.input}
                />
                <TextInput
                    label="End Time"
                    value={endTime}
                    onChangeText={text => setEndTime(text)}
                    style={styles.input}
                />
                <TextInput
                    label="Group"
                    value={group}
                    onChangeText={text => setGroup(text)}
                    style={styles.input}
                />
                <TextInput
                    label="Author"
                    value={author}
                    onChangeText={text => setAuthor(text)}
                    style={styles.input}
                />
                <Button style={{ marginBottom: 40 }} mode="contained" onPress={() => console.log('Pressed')}>
                    Ajoute un plavon
                </Button>

            </ScrollView>


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {

        padding: 20,  // Ajout d'un padding pour espacer les éléments
    },
    input: {
        marginBottom: 20,  // Ajout d'une marge inférieure pour espacer les champs
    },
});

export default MyForm;
