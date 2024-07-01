import { Link } from 'expo-router';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import ScrollView = Animated.ScrollView;
import { Avatar, Button, List } from 'react-native-paper';
import TopBar from "@/components/TopBar";
import Colors from '@/constants/Colors';

export default function SettignsScreen() {

    return (
        <ScrollView style={styles.container}>
            <TopBar onBellPress={() => {}} />
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
                        onPress={() => {}}
                        icon="key-variant"
                    >
                        Changer mon mot de passe
                    </Button>
                    <Button
                        mode="outlined"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={() => {}}
                        icon="account"
                    >
                        Information personnelles
                    </Button>
                </List.Section>
            </View>
        </ScrollView>
        // <SafeAreaView style={styles.container}>
        //     <Text>Settings Page</Text>
        // </SafeAreaView>
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
        borderColor: Colors.light.itemBackground,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: 'PoppinsRegular'
    },
    separator: {
        width: '60%',
        height: 1,
        backgroundColor: '#A9A9A9', // Couleur grise foncée
        marginVertical: 20,
    },
});
