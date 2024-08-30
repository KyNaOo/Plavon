import {router, usePathname, useSegments} from 'expo-router';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, IconButton,} from 'react-native-paper';
import DayComponent from './Date';
import DateMoi from './DateMoi';
import CardItem from './CardItem';
import React, {useEffect, useState} from "react";
import {useAuth} from "@/services/AuthContext";
import api from "@/services/api";
import {UserData} from "@/app/(tabs)/group";

export interface Plavon {
    name: string,
    description: string,
    startTime: Date,
    endTime: Date,
    author: UserData,
}

export default function HomeScreen() {
    const [plavons, setPlavons] = useState<Plavon[]>([])
    const [token, setToken] = useState<string>("")
    const pathname = usePathname();
    const {getToken} = useAuth();

    const fetchPlavons = async () => {
        if (token.length !== 0) {
            const response = await api.get('/plavon/today', {
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
    }, [token, pathname]);

    return (
        <View style={styles.container}>
            <View style={styles.boxButton}>
                <Button compact mode="outlined" onPress={() => console.log('Pressed')} style={{
                    margin: 10,
                    width: 100,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1,
                }}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>Aujourd'hui</Text>
                </Button>

                <Button compact mode="outlined" onPress={() => router.navigate('/home/calendar')} style={{
                    margin: 10,
                    width: 100,
                    backgroundColor: 'white',
                    borderColor: 'black',
                    borderWidth: 1
                }}>
                    <Text style={{fontWeight: 'bold', color: 'black'}}>Calendrier</Text>
                </Button>
                <IconButton
                    icon="plus"
                    iconColor={'black'}
                    size={20}
                    onPress={() => console.log('Pressed')}
                    mode='outlined'
                    containerColor='white'
                    style={{alignSelf: 'center', marginLeft: 'auto', margin: 10}}
                />
            </View>

            <DayComponent/>
            <DateMoi/>

            <View style={styles.txt}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Mes Plavons audj</Text>
            </View>

            <ScrollView style={styles.modal}>
                {plavons.length > 0 ? plavons.map((plavon: Plavon, index) => (
                    <CardItem
                        key={index}
                        title={plavon.name}
                        startTime={plavon.startTime}
                        endTime={plavon.endTime}
                        author={plavon.author}
                    />
                )):
                    <Text style={{alignSelf: 'center', marginTop: 50, fontSize: 20}}>Aucun plavons aujourd'hui </Text>
                }

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    boxButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    modal: {
        backgroundColor: '#D3D3D3',
    },
    txt: {
        borderWidth: 2,
        borderColor: 'black',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
});
