import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import api from "@/services/api";

import { useAuth } from "@/services/AuthContext";


const MyForm: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [group, setGroup] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const { decodeToken, getToken } = useAuth();


    useEffect(() => {
        async function fetchData() {
            console.log(getToken)
            const token = await decodeToken();
            setAuthor(token.id);
            console.log(author);
        }
        fetchData();
    }, []);




    const submitForm = async () => {
        try {
            await api.post('/plavon', {
                name,
                description,
                startTime,
                endTime,
                group,
                author,
            });
            console.log("Form submitted successfully");
            setName("");
            setDescription("");
            setStartTime("");
            setEndTime("");
            setGroup("");
            setAuthor("");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView style={styles.container}>
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                />
                <TextInput
                    label="Description"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />
                <TextInput
                    label="Start Time"
                    value={startTime}
                    onChangeText={setStartTime}
                    style={styles.input}
                />
                <TextInput
                    label="End Time"
                    value={endTime}
                    onChangeText={setEndTime}
                    style={styles.input}
                />
                <TextInput
                    label="Group"
                    value={group}
                    onChangeText={setGroup}
                    style={styles.input}
                />
                <TextInput
                    label="Author"
                    value={author}
                    onChangeText={setAuthor}
                    style={styles.input}
                />
                <Button style={{ marginBottom: 40 }} mode="contained" onPress={submitForm}>
                    Ajoute un plavon
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
});

export default MyForm;
