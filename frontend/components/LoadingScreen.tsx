import {Image, StyleSheet, View} from "react-native";
import {ActivityIndicator} from "react-native-paper";
import React from "react";

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/plavon_rose.png')}
                style={styles.image}
            />
            <ActivityIndicator animating={true} color={'white'} size={20} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#605790',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});