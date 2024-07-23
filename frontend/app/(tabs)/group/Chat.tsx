import {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Platform, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from "@/constants/Colors";

interface Message {
    id: string;
    text: string;
    isReceived: boolean;
    userName: string;
}

const Chat = () => {
        const [messages, setMessages] = useState<Message[]>([
            { id: '1', text: 'Supporting text', isReceived: true, userName: 'User1' },
            { id: '2', text: 'sadikoi !', isReceived: false, userName: 'User2' }
        ]);
        const [newMessage, setNewMessage] = useState('');
        const [currentUser, setCurrentUser] = useState<boolean>(false); // false for sender, true for receiver
        const [isKeyboardVisible, setKeyboardVisible] = useState(false);
        const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardWillHideListener = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);

        const toggleUser = () => {
            setCurrentUser(!currentUser);
        };

        const sendMessage = () => {
            if (newMessage.trim()) {
                const updatedMessages = [{ id: String(messages.length + 1), text: newMessage, isReceived: currentUser, userName: currentUser ? 'User1' : 'User2' }, ...messages];
                setMessages(updatedMessages);
                setNewMessage('');
                setTimeout(() => flatListRef.current?.scrollToIndex({ index: 0, animated: true }), 100);
            }
        };

        const renderItem = ({ item, index }: { item: Message, index: number }) => {
            const isFirstMessageInSeries = index === messages.length - 1 || messages[index + 1].isReceived !== item.isReceived;
            const isSameUserAsPrevious = index < messages.length - 1 && messages[index + 1].isReceived === item.isReceived;
            const isFirstMessage = index === messages.length - 1;
            const marginTop = isFirstMessage || !isSameUserAsPrevious ? -5 : -5;
        return (
            <View style={{ marginVertical: marginTop }}>
                {isFirstMessageInSeries && (
                    <Text style={[styles.userName, item.isReceived ? styles.receivedUserName : styles.sentUserName]}>
                        {item.userName}
                    </Text>
                )}
                <View style={[styles.messageContainer, item.isReceived ? styles.receivedMessage : styles.sentMessage]}>
                    {/*<View style={styles.messageTextContainer}>*/}
                        <View style={[
                            styles.messageTextContainer,
                            item.isReceived ? styles.receivedMessage : styles.sentMessage,
                            { backgroundColor: item.isReceived ? Colors.light.colorRose : Colors.light.colorRoseFushua } // Add background color based on isReceived
                        ]}>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={styles.chatContainer}
                        inverted
                    />
                    <View style={[styles.inputContainer, isKeyboardVisible && styles.inputContainerWithKeyboard]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Supporting text"
                            value={newMessage}
                            onChangeText={setNewMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <MaterialCommunityIcons name="send" size={24} color={Colors.light.colorRoseFushua} />
                        </TouchableOpacity>
                            {/*<TouchableOpacity onPress={toggleUser} style={styles.toggleButton}>*/}
                            {/*    <Text style={styles.toggleButtonText}>Switch User</Text>*/}
                            {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.white,
    },
    innerContainer: {
        flex: 1,
    },
    chatContainer: {
        flex: 1,
        padding: 10,
    },
    messageContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    receivedMessage: {
        alignItems: 'flex-start',
    },
    sentMessage: {
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: 12,
        color: '#888',
    },
    receivedUserName: {
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    sentUserName: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    messageTextContainer: {
        maxWidth: '80%',
        backgroundColor: '#FFB6C1',
        padding: 10,
        borderRadius: 15,
        marginVertical: 2,
    },
    messageText: {
        color: Colors.light.white,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4.65,
        elevation: 7,
        backgroundColor: Colors.light.white,
    },
    inputContainerWithKeyboard: {
        marginBottom: Platform.OS === 'ios' ? 20 : 0,
    },

    input: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.text,
        padding: 10,
        marginRight: 10,
        backgroundColor: Colors.light.fieldTextColor,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: Colors.light.text,
        paddingTop: 8,
        paddingLeft: 10,
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#FFB6C1',
        borderRadius: 20,
        marginLeft: 10,
    },
    toggleButtonText: {
        color: '#fff',
    },
});

export default Chat;
