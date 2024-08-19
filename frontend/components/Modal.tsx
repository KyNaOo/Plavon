import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal as RNModal,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
    Animated,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import ScrollView = Animated.ScrollView;

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, children, title }) => {
    return (
        <RNModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent />
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.modalContainer}
                        >
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{title}</Text>
                                    <IconButton icon="close" size={24} onPress={onClose} />
                                </View>
                                {children}
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        height: '75%',
    },
    modalContent: {
        backgroundColor: '#E6DEFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContentContainer: {
        padding: 20,
        height: '100%',
    },
    modalHeader: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
});

export default CustomModal;
