import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {Avatar, Chip, IconButton, Searchbar} from 'react-native-paper';
import Colors from '@/constants/Colors';
import {router} from "expo-router";
import FullScreenModal from "@/components/FullScreenModal";
import {MaterialIcons} from "@expo/vector-icons";
import api from "@/services/api";
import {useAuth} from "@/services/AuthContext";
import ScrollView = Animated.ScrollView;

export default function DetailsProfile() {
    type User = {
        firstName: string;
        lastName: string;
        email: string;
        bio: string;
    };
    type Interest = {
        id: string;
        name: string;
    }

    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioText, setBioText] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
    const [userInterests, setUserInterests] = useState<Interest[]>([]);
    const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
    const [user, setUser] = useState<User>();
    const [userId, setUserId] = useState();
    const searchInputRef = useRef<TextInput>(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredInterests, setFilteredInterests] = useState<Interest[]>([]);
    const {decodeToken, getToken} = useAuth();
    const [bearerToken, setBearerToken] = useState<any>()

    const stopEditingBio = async () => {
        if (bioText==''){
            setIsEditingBio(false);
        }
        try {
            const response = await api.patch(`/user/${userId}`, {
                    bio: bioText
                },
                {
                    headers: {
                        Authorization: `Bearer ${bearerToken}`
                    },
                });
            getUserInfos();
        } catch (error) {
            // @ts-ignore
            console.error("Erreur lors de la modification de la bio :", JSON.parse(error.request.response));
        }
    }
    const onChangeSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredInterests(availableInterests);
        } else {
            setFilteredInterests(
                availableInterests.filter((interest) =>
                    interest.name.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    async function getUserInterests() {
        const response = await api.get(`/user/${userId}/interests`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
        if (response.status === 200) {
            if (response.data) {
                const myInterests = response.data.map((interest: any) => interest);
                setUserInterests(myInterests);
                setSelectedInterests(myInterests);
            }
        }
    }

    async function getAvailableInterests() {
        const response = await api.get(`/user/${userId}/available-interests`, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
        if (response.status === 200) {
            const theAvailableInterests = response.data.map((interest: any) => interest);
            setAvailableInterests(theAvailableInterests);
            setFilteredInterests(theAvailableInterests);
        }
    }

    const removeInterest = async (interest: any) => {
        const updatedSelectedInterests = selectedInterests.filter(item => item.id !== interest.id);
        setSelectedInterests(updatedSelectedInterests);

        const updatedAvailableInterests = [...availableInterests, interest].sort((a, b) => a.name.localeCompare(b.name));
        setAvailableInterests(updatedAvailableInterests);

        const updatedFilteredInterests = [...filteredInterests, interest].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredInterests(updatedFilteredInterests);
    };

    const addInterest = (interest: any) => {
        if (selectedInterests.length >= 6) {
            alert('Vous ne pouvez pas ajouter plus de 6 centres d’intérêt.');
            return;
        }

        if (!selectedInterests.some(item => item.id === interest.id)) {
            setAvailableInterests(availableInterests.filter(item => item.id !== interest.id));
            setSelectedInterests([...selectedInterests, interest]);
            setFilteredInterests(filteredInterests.filter(item => item.id !== interest.id));
        }
    };

    async function updateInterests() {
        const myIdInterests = selectedInterests.map((interest: any) => interest.id);
        const response = await api.put(`/user/${userId}/interests`, {
            interests: myIdInterests,
        }, {
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        })
    }

    const handleCloseModal = () => {
        setIsModalVisible(!isModalVisible);
        updateInterests();
        setUserInterests([...selectedInterests]);
    };

    async function getUserInfos() {
        try {
            const response = await api.get(`/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            });
            if (response.status === 200) {
                setUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    bio: response.data.bio
                });
            }
        } catch (error) {
            // @ts-ignore
            console.error("Erreur lors de la récupération des infos :", JSON.parse(error.request.response));
        }
    }

    useEffect(() => {
        getToken().then((token) => {
            setBearerToken(token);
        });
        decodeToken().then((token) => {
            setUserId(token.sub)
        })
    }, []);

    useEffect(() => {
        if(bearerToken){
            getAvailableInterests()
            getUserInfos()
            getUserInterests()
        }
    }, [userId, bearerToken]);

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
                    <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
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
                                onBlur={() => stopEditingBio()}
                                autoFocus
                            />
                        ) : (
                            <>
                                <Text style={styles.bioText}>{user?.bio}</Text>
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
                        {userInterests.map((interest, index) => (
                            <Chip key={index} style={styles.chip}>
                                <Text style={styles.chipText}>{interest.name}</Text>
                            </Chip>
                        ))}
                    </View>
                </View>
                {isModalVisible && <View style={styles.modalOverlay} />}
                <FullScreenModal
                    visible={isModalVisible}
                    onClose={handleCloseModal}
                    title="Vos centres d’intérêt"
                >
                    <ScrollView
                        contentContainerStyle={styles.modalScrollViewContent}
                        >
                        <View style={styles.modalChipsContainer}>
                            {selectedInterests.map((interest, index) => (
                                <Chip
                                    key={index}
                                    style={styles.chip}
                                    onClose={() => removeInterest(interest)}
                                >
                                    <Text style={styles.chipText}>{interest.name}</Text>
                                </Chip>
                            ))}
                        </View>
                        <View style={styles.center}>
                            <Searchbar
                                placeholder="Rechercher un centre d’intérêt"
                                style={styles.searchInput}
                                value={searchQuery}
                                onChangeText={onChangeSearch}
                                ref={searchInputRef}
                            />
                        </View>
                    <View style={styles.searchResultsContainer}>
                        {filteredInterests.map((interest, index) => (
                            <Chip
                                key={index}
                                style={styles.chip}
                                icon={() => (
                                    <MaterialIcons name="add" size={24} color="white" />
                                )}
                                onPress={() => addInterest(interest)}
                            >
                                <Text style={styles.chipText}>{interest.name}</Text>
                            </Chip>
                        ))}
                    </View>
                    </ScrollView>
                </FullScreenModal>
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
        color: Colors.light.colorRose,
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
        backgroundColor: Colors.light.colorRose,
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
        backgroundColor: Colors.light.white,
        borderRadius: 8,
    },
    modalChip: {
        margin: 4,
    },
    searchInput: {
        width: '90%',
        backgroundColor: Colors.light.greyBackground,
        marginBottom: 20,
    },
    searchResultsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: Colors.light.white,
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
