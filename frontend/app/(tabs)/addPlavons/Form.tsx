import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAuth} from "@/services/AuthContext";
import {useSocket} from "@/services/SocketIO/socket";
import {UserData} from "@/app/(tabs)/group";
import DropDownPicker from 'react-native-dropdown-picker';
import api from "@/services/api";

interface DropdownType {
    label: string;
    value: string;
}

interface FormState {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
}

interface Group {
    id: string,
    name: string,
    creatorId: string | null,
    members: UserData[],
    createdAt: Date,
    updatedAt: Date,
}
const MyForm: React.FC = () => {
    const [formState, setFormState] = useState<FormState>({
        name: "",
        description: "",
        startTime: new Date(),
        endTime: new Date(),
    });
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState<DropdownType[]>([]);
    const [locale, setLocale] = useState('fr-FR');
    const [userId, setUserId] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const { getUserId } = useAuth();
    const socket = useSocket();

    useEffect(() => {
        if (Platform.OS === 'ios') {
            setLocale('fr_FR');
        }
    }, []);

    const getAllGroups = () => {
        if (userId) {
            socket.emit('getUserGroups', {userId: userId});
            socket.on('userGroups', (groups: Group[]) => {
                let a: DropdownType[];
                a = [];
                groups.map((group) => {
                    a.push({
                        label: group.name,
                        value: group.id,
                    })
                })
                setItems(a)
            })
        }
    }

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId();
            setUserId(id);
        };
        fetchUserId();
    }, [getUserId]);

    useEffect(() => {
        getAllGroups();
    }, [userId]);

    // @ts-ignore
    const onChangeStart = (event, selectedDate) => {
        setFormState({...formState, startTime: selectedDate});
    };

    // @ts-ignore
    const onChangeEnd = (event, selectedDate) => {
        setFormState({...formState, endTime: selectedDate});
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const submitForm = async () => {

        formState.startTime.setHours(formState.startTime.getHours() +2)
        formState.endTime.setHours(formState.endTime.getHours() +2)

        if (formState.name.length === 0) {
            setSnackbar({open: true, message: 'Le nom ne doit pas être vide !', severity: 'error'})
            return;
        }
        if (formState.description.length === 0) {
            setSnackbar({open: true, message: 'La description ne doit pas être vide !', severity: 'error'})
            return;
        }
        if (value === null) {
            setSnackbar({open: true, message: 'Vous devez choisir un groupe !', severity: 'error'})
            return;
        }

        try {
            await api.post('/plavon', {
                name: formState.name,
                description: formState.description,
                startTime: formState.startTime,
                endTime: formState.endTime,
                groupId: value,
                authorId: userId,
            });
            setSnackbar({open: true, message: 'Plavon créé avec succès', severity: 'success'})
            setFormState({
                name: "",
                description: "",
                startTime: new Date(),
                endTime: new Date(),
            })
            setValue(null)
        } catch (error) {
            setSnackbar({open: true, message: "Error submitting form: "+ error, severity: 'error'})
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView style={styles.container}>
                <TextInput
                    label="Name"
                    value={formState.name}
                    onChangeText={(text) => setFormState({...formState, name: text})}
                    style={styles.input}
                />
                <TextInput
                    label="Description"
                    value={formState.description}
                    onChangeText={(text) => setFormState({...formState, description: text})}
                    style={styles.input}
                />
                <View style={styles.inputGroup}>
                    <Text style={{fontSize: 16}}>Date de debut du plavon</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={formState.startTime}
                        mode={'datetime'}
                        onChange={onChangeStart}
                        locale={locale}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={{fontSize: 16}}>Date de fin du plavon</Text>
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={formState.endTime}
                        mode={'datetime'}
                        onChange={onChangeEnd}
                        locale={locale}
                    />
                </View>
                {items.length > 0 &&
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        style={styles.input}
                    />
                }

                <Button style={{ marginBottom: 40 }} mode="contained" onPress={submitForm}>
                    Ajoute un plavon
                </Button>

                <Snackbar
                    visible={snackbar.open}
                    onIconPress={handleCloseSnackbar}
                    onDismiss={handleCloseSnackbar}
                    style={[styles.snackBar, snackbar.severity === 'success' ? styles.snackBarSuccess : styles.snackBarError]}
                    duration={3000}
                >
                    {snackbar.message}
                </Snackbar>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    snackBar: {
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
    },
    snackBarSuccess: {
        backgroundColor: '#5CB85C'
    },
    snackBarError: {
        backgroundColor: '#ED4337',
    }
});

export default MyForm;
