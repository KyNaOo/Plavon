// App.js
import { router } from 'expo-router';  // Assurez-vous que l'import de 'expo-router' est correct
import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import HorizontalTransaction from './Monthcaroussel';
import {useAuth} from "@/services/AuthContext";
import api from "@/services/api";
import {Plavon} from "@/app/(tabs)/home/index";
import CardItem from "@/app/(tabs)/home/CardItem";

const App = () => {
    const [plavons, setPlavons] = useState<Plavon[]>([])
    const [month, setMonth] = useState<number>(0)
    const [token, setToken] = useState<string>("")
    const {getToken} = useAuth();

    const fetchPlavons = async () => {
        if (token.length !== 0) {
            const response = await api.get(`/plavon/month/${month+1}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                setPlavons(response.data.plavons)
            }
        }
    }

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken();
            if (token !== null) {
                setToken(token)
            }
        }
        fetchToken()
    }, [getToken]);


    useEffect(() => {
        fetchPlavons()
    }, [token, month]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.boxButton}>
                <Button compact mode="outlined" onPress={() => router.navigate('/home')} style={{ margin: 10, width: 100, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Aujourd'hui</Text>
                </Button>

                <Button compact mode="outlined" onPress={() => router.navigate('/home/calendar')} style={{ margin: 10, width: 100, backgroundColor: 'white', borderColor: 'black', borderWidth: 1, }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Calendrier</Text>
                </Button>

                <IconButton
                    icon="plus"
                    iconColor={'black'}
                    size={20}
                    onPress={() => console.log('Pressed')}
                    mode='outlined'
                    containerColor='white'
                    style={{ alignSelf: 'center', marginLeft: 'auto', margin: 10 }}
                />
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
                <HorizontalTransaction setMonth={setMonth} />
                <ScrollView contentContainerStyle={{paddingBottom: 120}} >
                    {plavons.length > 0 ? plavons.map((plavon: Plavon, index) => (
                        <CardItem
                            key={index}
                            title={plavon.name}
                            startTime={plavon.startTime}
                            endTime={plavon.endTime}
                            author={plavon.author}
                        />
                    )):
                        <Text style={{alignSelf: 'center', marginTop: 50, fontSize: 20}}>Aucun plavons pour ce mois </Text>
                    }
                </ScrollView>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    boxButton: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },



});

export default App;
