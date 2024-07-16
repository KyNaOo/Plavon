// App.js
import { router } from 'expo-router';  // Assurez-vous que l'import de 'expo-router' est correct
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import HorizontalTransaction from './Monthcaroussel';
import CardCalendar from './CardCalendar';

const App = () => {
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
                <HorizontalTransaction />
                <ScrollView style={{ height: '100%' }}   >

                    <CardCalendar title="Plavon 1" startTime="10:00" endTime="11:00" />
                    <CardCalendar title="Plavon 1" startTime="10:00" endTime="11:00" />

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
