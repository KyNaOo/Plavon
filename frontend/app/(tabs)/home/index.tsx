import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollViewComponent, ScrollView } from 'react-native';
import { Avatar, Button, Card, IconButton, } from 'react-native-paper';
import DayComponent from './Date';
import DateMoi from './DateMoi';
import CardItem from './CardItem';
export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.boxButton}>
                <Button compact mode="contained" onPress={() => console.log('Pressed')} style={{ margin: 10, width: 100, backgroundColor: '#8DE3DF', }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Aujourd'hui</Text>

                </Button>
                <Button compact mode="contained" onPress={() => console.log('Pressed')} style={{ margin: 10, width: 100, backgroundColor: '#8DE3DF' }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>Calendrier</Text>
                </Button>
                <IconButton
                    icon="plus"
                    iconColor={'black'}
                    size={20}
                    onPress={() => console.log('Pressed')}
                    mode='contained'
                    containerColor='#8DE3DF'
                    style={{ alignSelf: 'center', marginLeft: 'auto', margin: 10 }}
                />
            </View>

            <DayComponent />
            <DateMoi />

            <View style={styles.txt}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Tes Plavons audj</Text>
            </View>

            <ScrollView style={styles.modal} >
                <CardItem title="Plavon 1" startTime="10:00" endTime="11:00" />
                <CardItem title="Plavon 1" startTime="10:00" endTime="11:00" />

            </ScrollView>




        </View >
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


        backgroundColor: '#D3D3D3 ',


    },
    txt: {

        backgroundColor: '#F3508E',
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
