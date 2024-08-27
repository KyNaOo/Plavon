import React, {useEffect, useState} from 'react';
import {Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Link, router} from 'expo-router';
import {Button, IconButton, Snackbar, TextInput} from 'react-native-paper';
import Colors from '@/constants/Colors';
import api from "@/services/api";
import {useAuth} from "@/services/AuthContext";

type error = {
    "message": string[];
    "error": string;
    "statusCode": number;
}
export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [mdp, setMdp] = useState('');
    const [comfirmMdp, setConfirmMdp] = useState('');
    const [error, setError] = useState({
        "message": '',
        "error": '',
        "statusCode": 401
    });
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [idUser, setIdUser] = useState<string>();
    const [bearerToken, setBearerToken] = useState<any>();

    const {saveToken, getToken, decodeToken} = useAuth();

    const dismissError = () => {
        setIsError(false);
        setError({
            "message": '',
            "error": '',
            "statusCode": 401
        })
    }

    const changePassword = async () => {
        setIsLoading(true);
        if(mdp === comfirmMdp && mdp !== '') {
            const response = await api.patch(`/user/${idUser}`, {
                password: mdp
            },{
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            })
                .then((response) => {
                    return response
                })
                .catch((error) => {
                return error;
            });
            if (response.status === 200) {
                await saveToken(response.data.access_token);
                setIsLoading(false);
                router.navigate('/settings/index');
            } else {
                setIsLoading(false);
                setError(JSON.parse(response.request.response));
                setIsError(true);
            }
        }      
    }

    const test = () => {
        console.warn("my ID : " + idUser);
        console.warn("my Bearer token : " + bearerToken);
    }

    useEffect(() => {
        getToken().then((token) => {
            setBearerToken(token);
        });
        decodeToken().then((token) => {
            setIdUser(token.sub)
        })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                        visible={isError}
                        onIconPress={dismissError}
                        onDismiss={dismissError}
                        style={styles.snackBar}
                        duration={3000}
                    >
                        {error.message[0]}
                    </Snackbar>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>Changer de mot de passe</Text>
                    </View>
                    <View style={styles.middleContainer}>
                        <TextInput
                            label="Mot de passe"
                            value={mdp}
                            onChangeText={(mdp) => setMdp(mdp)}
                            style={styles.input}
                            secureTextEntry
                            theme={{roundness: 5}}
                        />
                        <TextInput
                            label="Confirmer le mot de passe"
                            value={comfirmMdp}
                            onChangeText={(comfirmMdp) => setConfirmMdp(comfirmMdp)}
                            style={styles.input}
                            secureTextEntry
                            theme={{roundness: 5}}
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 25,
        zIndex: 1,
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
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
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
    description: {
        fontFamily: 'PoppinsRegular',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        marginBottom: 20,
    },
    linkText: {
        color: Colors.light.itemBackground,
        textDecorationLine: 'underline',
        fontFamily: 'PoppinsRegular',
    },
    snackBar: {
        width: '100%',
        alignSelf: 'center',
        marginLeft: 50
    },
    iconButtonContainer: {
        marginTop: 25,
    },
});