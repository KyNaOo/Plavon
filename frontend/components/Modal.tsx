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
    KeyboardAvoidingView
} from 'react-native';
import { IconButton } from 'react-native-paper';
import ScrollView = Animated.ScrollView;
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, children, title }) => {
    return (
        <RNModal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlayContainer}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <IconButton icon="close" size={24} onPress={onClose} />
                    </View>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.modalContentContainer}
                        enableOnAndroid={true}
                        extraScrollHeight={100}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode="none"
                    >
                        {children}
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </RNModal>
    );
};

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '100%',
        height: '75%',
        backgroundColor: '#E6DEFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContentContainer: {
        padding: 20,
        flex: 1,
    },
    modalHeader: {
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 10,
    },
    modalTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

export default CustomModal;
