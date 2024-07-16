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
import {Avatar, Chip, IconButton, Searchbar} from 'react-native-paper';
import Colors from '@/constants/Colors';
import TopBar from "@/components/TopBar";
import ScrollView = Animated.ScrollView;
import {useEffect, useRef, useState} from "react";
import {router} from "expo-router";
import CustomModal from "@/components/Modal";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function DetailsProfile() {
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioText, setBioText] = useState("D’ailleurs mon zebla c’est Boris");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState(['Basket', 'Cinéma', 'Football', 'Billard']);
    const [availableInterests, setAvailableInterests] = useState(['Tennis', 'Lecture', 'Musique', 'Voyage','Tennis', 'Lecture', 'Musique', 'Voyage','Tennis', 'Lecture', 'Musique', 'Voyage','Tennis', 'Lecture', 'Musique', 'Voyage']);
    const [displayedInterests, setDisplayedInterests] = useState(selectedInterests);
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const searchInputRef = useRef<TextInput>(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInterests, setFilteredInterests] = useState(availableInterests);
    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredInterests(availableInterests);
        } else {
            setFilteredInterests(
                availableInterests.filter((interest) =>
                    interest.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };
    const removeInterest = (interest: string) => {
        setSelectedInterests(selectedInterests.filter(item => item !== interest));
        setAvailableInterests([...availableInterests, interest]);
    };

    const handleFocus = () => {
        if (scrollRef.current && searchInputRef.current) {
            scrollRef.current.scrollToFocusedInput(searchInputRef.current, 0);
        }
    };

    const addInterest = (interest: string) => {
        if (selectedInterests.length >= 6) {
            alert('Vous ne pouvez pas ajouter plus de 6 centres d’intérêt.');
            return;
        }
        if (!selectedInterests.includes(interest)) {
            setAvailableInterests(availableInterests.filter(item => item !== interest));
            setSelectedInterests([...selectedInterests, interest]);
            setFilteredInterests(filteredInterests.filter(item => item !== interest));
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    useEffect(() => {
        setDisplayedInterests(selectedInterests);
    }, [isModalVisible]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView style={styles.container}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => router.back()}
                />
                <View style={styles.profileContainer}>
                    <Avatar.Image
                        size={100}
                        source={{uri: 'https://your-image-url.com'}}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>Ethan Bellaiche</Text>
                    <Text style={styles.email}>ethanbellaiche0@gmail.com</Text>
                    <View style={styles.separator}/>
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
                        <View style={styles.bioHeader}>
                        <Text style={styles.bioTitle}>BIO</Text>
                            <IconButton
                                icon="pencil"
                                size={20}
                                onPress={() => setIsEditingBio(true)}
                                style={styles.bioIcon}
                            />
                        </View>
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
                    <View style={styles.interestsHeader}>
                        <Text style={styles.interestsTitle}>Centres d’intérêt</Text>
                        <IconButton
                            icon="menu"
                            size={24}
                            iconColor={"grey"}
                            onPress={() => setIsModalVisible(true)}
                        />
                    </View>

                    <View style={styles.interestsContainer}>
                        {displayedInterests.map((interest, index) => (
                            <Chip key={index} style={styles.chip}>
                                <Text style={styles.chipText}>{interest}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>
                {isModalVisible && <View style={styles.modalOverlay} />}
                <CustomModal
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    title="Vos centres d’intérêt"
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardAvoidingView}
                    >
                    <ScrollView
                        contentContainerStyle={styles.modalScrollViewContent}
                        // keyboardShouldPersistTaps="handled"
                        >
                    <View style={styles.modalChipsContainer}>
                        {selectedInterests.map((interest, index) => (
                            <Chip
                                key={index}
                                style={styles.chip}
                                onClose={() => removeInterest(interest)}
                            >
                                <Text style={styles.chipText}>{interest}</Text>
                            </Chip>
                        ))}
                    </View>
                        <Searchbar
                            placeholder="Rechercher un centre d’intérêt"
                            style={styles.searchInput}
                            value={searchQuery}
                            onChangeText={onChangeSearch}
                            ref={searchInputRef}
                            onFocus={handleFocus}
                        />

                    <View style={styles.searchResultsContainer}>
                        {filteredInterests.map((interest, index) => (
                            <Chip
                                key={index}
                                style={styles.chip}
                                icon="plus"
                                onPress={() => addInterest(interest)}
                            >
                                <Text style={styles.chipText}>{interest}</Text>
                            </Chip>
                        ))}
                    </View>
                    </ScrollView>
                    </KeyboardAvoidingView>
                </CustomModal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    interestsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 10,
    },
    modalContent: {
        alignItems: 'center',
    },
    modalChipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
    },
    modalChip: {
        margin: 4,
    },
    searchInput: {
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    searchResultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 24,
    },
    searchResultChip: {
        margin: 4,
    },
    modalScrollViewContent: {
        paddingBottom: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    bioIcon: {
        margin: 0,
    },
    bioHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
