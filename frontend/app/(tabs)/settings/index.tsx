import React from 'react';
import {useRouter} from 'expo-router';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import { Avatar, Button, List } from 'react-native-paper';
import ScrollView = Animated.ScrollView;
import TopBar from "@/components/TopBar";
import Colors from '@/constants/Colors';
import { useAuth } from '@/services/AuthContext';

export default function SettingsScreen() {
    const router = useRouter();
    const { logout } = useAuth(); 

    const navToDetails = () => {
        router.navigate('/settings/DetailsProfile');
    };

    const navToChat = () => {
        router.navigate('/group/Chat');
    };

    const handleLogout = async () => {
        await logout();  
        router.replace('/'); 
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar.Image
                    size={100}
                    source={{ uri: 'https://your-image-url.com' }}
                    style={styles.avatar}
                />
                <Text style={styles.profileTitle}>Profil</Text>
                <View style={styles.separator} />
                <List.Section>
                    <Button
                        mode="outlined"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={navToChat}
                        icon="key-variant"
                    >
                        Changer mon mot de passe
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={navToDetails}
                        icon="account"
                    >
                        Information personnelles
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={handleLogout}  
                        icon="exit-to-app"
                    >
                        Déconnexion
                    </Button>
                </List.Section>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        backgroundColor: '#FFB6C1',
    },
    profileTitle: {
        fontSize: 24,
        marginVertical: 20,
        fontFamily: 'PoppinsRegular',
        textAlign: 'center',
    },
    button: {
        marginVertical: 10,
        borderColor: Colors.light.secondaryPurpleBackground,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: 'PoppinsRegular'
    },
    separator: {
        width: '60%',
        height: 1,
        backgroundColor: '#A9A9A9',
        marginVertical: 20,
    },
});
