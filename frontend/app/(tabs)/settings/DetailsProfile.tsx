import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView, Platform
} from 'react-native';
import {Avatar, Chip, IconButton} from 'react-native-paper';
import Colors from '@/constants/Colors';
import TopBar from "@/components/TopBar";
import ScrollView = Animated.ScrollView;
import {useState} from "react";
import {router} from "expo-router";

export default function DetailsProfile() {
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioText, setBioText] = useState("D’ailleurs mon zebla c’est Boris");
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
        <ScrollView style={styles.container}>
            <TopBar onBellPress={() => {}}/>
            <IconButton
                icon="arrow-left"
                size={24}
                onPress={() => router.back()}
            />
            <View style={styles.profileContainer}>
                <Avatar.Image
                    size={100}
                    source={{ uri: 'https://your-image-url.com' }}
                    style={styles.avatar}
                />
                <Text style={styles.name}>Ethan Bellaiche</Text>
                <Text style={styles.email}>ethanbellaiche0@gmail.com</Text>
                <View style={styles.separator} />
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>5</Text>
                        <Text style={styles.statLabel}>Groupes</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.statValue}>17</Text>
                        <Text style={styles.statLabel}>Événements</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.bioContainer} onPress={() => setIsEditingBio(true)}>
                    <Text style={styles.bioTitle}>BIO</Text>
                    {isEditingBio ? (
                        <TextInput
                            style={styles.bioText}
                            value={bioText}
                            onChangeText={setBioText}
                            onBlur={() => setIsEditingBio(false)}
                            autoFocus
                        />
                    ) : (
                        <>
                            <Text style={styles.bioText}>{bioText}</Text>
                        </>
                    )}
                </TouchableOpacity>
                <Text style={styles.interestsTitle}>Centres d’intérêt</Text>

                <View style={styles.interestsContainer}>
                    <Chip style={styles.chip}>
                        <Text style={styles.chipText}>Basket</Text>
                    </Chip>
                    <Chip style={styles.chip}>
                        <Text style={styles.chipText}>Cinéma</Text>
                    </Chip>
                    <Chip style={styles.chip}>
                        <Text style={styles.chipText}>Football</Text>
                    </Chip>
                    <Chip style={styles.chip}>
                        <Text style={styles.chipText}>Billard</Text>
                    </Chip>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#FFB6C1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 100,
        height: 40,
    },
    bellContainer: {
        padding: 10,
    },
    bell: {
        width: 24,
        height: 24,
    },
    profileContainer: {
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        backgroundColor: '#FFB6C1',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'PoppinsBold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'PoppinsRegular',
    },
    separator: {
        width: '80%',
        height: 1,
        backgroundColor: '#A9A9A9',
        marginVertical: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontFamily: 'PoppinsBold',
        color: Colors.light.itemBackground,
    },
    statLabel: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'PoppinsRegular',
    },
    bioContainer: {
        backgroundColor: '#D0C3CC',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginVertical: 10,
    },
    bioTitle: {
        fontSize: 18,
        fontFamily: 'PoppinsBold',
    },
    bioText: {
        fontSize: 16,
        marginTop: 8,
        fontFamily: 'PoppinsRegular',
    },
    interestsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        fontFamily: 'PoppinsBold',
    },

    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    chip: {
        margin: 12,
        backgroundColor: Colors.light.itemBackground,
        width: '40%',
        justifyContent: 'center',
        textAlign: 'center',
    },
    chipText: {
        textAlign: 'center',
        fontFamily: 'PoppinsRegular',
    },
});
