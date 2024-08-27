import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, Snackbar, TextInput, Button } from 'react-native-paper';
import Colors from '@/constants/Colors';
import api from "@/services/api";
import { useAuth } from "@/services/AuthContext";
import { router } from 'expo-router';

export default function LoginScreen() {
    const [mdp, setMdp] = useState('');
    const [confirmMdp, setConfirmMdp] = useState('');
    const [error, setError] = useState({ message: '', statusCode: 401 });
    const [isLoading, setIsLoading] = useState(false);
    const [idUser, setIdUser] = useState<string | undefined>(undefined);
    const [bearerToken, setBearerToken] = useState<string | undefined>(undefined);

    const { getToken, decodeToken } = useAuth();

    const dismissError = () => {
        setError({ message: '', statusCode: 401 });
    };

    const changePassword = async () => {
        if (mdp !== confirmMdp || mdp === '') {
            setError({ message: 'Les mots de passe ne correspondent pas ou sont vides.', statusCode: 400 });
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.patch(
                `/user/${idUser}`,
                { password: mdp },
                { headers: { Authorization: `Bearer ${bearerToken}` } }
            );

            if (response.status === 200) {
                setIsLoading(false);
                router.back();
            } else {
                setError({ message: JSON.parse(response.request.response).message[0], statusCode: response.status });
                setIsLoading(false);
            }
        } catch (error: any) {
            setError({ message: error.message, statusCode: error.response?.status || 500 });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getToken().then((token) => {
            if (token) {
                setBearerToken(token);
            }
        });
        decodeToken().then((token) => {
            if (token) {
                setIdUser(token.sub);
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.iconButtonContainer}>
                        <IconButton
                            icon="arrow-left"
                            size={32}
                            iconColor="#EFB4E9"
                            onPress={() => router.back()}
                        />
                    </View>
                    <Snackbar
                        visible={!!error.message}
                        onIconPress={dismissError}
                        onDismiss={dismissError}
                        style={styles.snackBar}
                        duration={3000}
                    >
                        {error.message}
                    </Snackbar>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Changer de mot de passe</Text>
                    </View>
                    <View style={styles.middleContainer}>
                        <TextInput
                            label="Mot de passe"
                            value={mdp}
                            onChangeText={setMdp}
                            style={styles.input}
                            secureTextEntry
                            theme={{ roundness: 5 }}
                        />
                        <TextInput
                            label="Confirmer le mot de passe"
                            value={confirmMdp}
                            onChangeText={setConfirmMdp}
                            style={styles.input}
                            secureTextEntry
                            theme={{ roundness: 5 }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor="#EFB4E9"
                            labelStyle={styles.buttonText}
                            style={styles.button}
                            onPress={changePassword}
                            loading={isLoading}
                        >
                            Changer
                        </Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
    },
    middleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 20,
    },
    button: {
        width: '90%',
        marginVertical: 15,
    },
    buttonText: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        padding: 5,
    },
    title: {
        fontFamily: 'PoppinsRegular',
        fontSize: 25,
        color: Colors.light.itemBackground,
    },
    input: {
        width: '80%',
        marginBottom: 20,
    },
    snackBar: {
        width: '100%',
        alignSelf: 'center',
        marginLeft: 50,
    },
    iconButtonContainer: {
        marginTop: 25,
    },
});
