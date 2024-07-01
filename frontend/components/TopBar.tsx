import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import Colors from '@/constants/Colors';

interface TopBarProps {
    onBellPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onBellPress }) => {
    return (
        <Appbar.Header style={styles.header}>
            <View style={styles.logoContainer}>
            <Image
                source={require('../assets/images/WhiteLogoTransparent.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            </View>
            {/*<Appbar.Content  title={}/>*/}
            <Appbar.Action icon="bell" color={'white'} onPress={onBellPress} />
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.light.itemBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 40,
    },
    logoContainer: {
        paddingLeft: 16, // Adjust this value to control the space
    },
});

export default TopBar;
