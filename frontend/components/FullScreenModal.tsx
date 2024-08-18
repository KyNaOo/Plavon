import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal as RNModal,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withTiming, 
    Easing,
    runOnJS
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface FullScreenModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ visible, onClose, children, title }) => {
    const translateY = useSharedValue(1000);

    React.useEffect(() => {
        if (visible) {
            translateY.value = withTiming(0, { 
                duration: 300, 
                easing: Easing.out(Easing.ease) 
            });
        } else {
            translateY.value = withTiming(1000, { 
                duration: 300, 
                easing: Easing.in(Easing.ease) 
            });
        }
    }, [visible]);

    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <RNModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="light-content" translucent />
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <KeyboardAvoidingView 
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.modalContainer}
                        >
                            <Animated.View style={[styles.modalContent, modalStyle]}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{title}</Text>
                                    <IconButton 
                                        icon="close" 
                                        size={24} 
                                        onPress={() => {
                                            translateY.value = withTiming(1000, { 
                                                duration: 300, 
                                                easing: Easing.in(Easing.ease) 
                                            }, () => runOnJS(onClose)());
                                        }} 
                                    />
                                </View>
                                {children}
                            </Animated.View>
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
    modalContainer: {
        width: '100%',
        height: Platform.OS === 'ios' ? '95%' : '100%',
        marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: '100%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FullScreenModal;
