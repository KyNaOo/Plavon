import {View, Text, StyleSheet, SafeAreaView} from "react-native";

export default function LoginScreen () {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.linkText}>Coucou</Text>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#605790',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    image: {
      width: 300, // Adjust the width as needed
      height: 300, // Adjust the height as needed
      resizeMode: 'contain', // Ensure the image scales uniformly
      marginBottom: 20, // Add some margin below the image if needed
    },
    buttonContainer: {
      width: '50%',
      marginBottom: 20,
    },
    button: {
      marginVertical: 15,
    },
    linkContainer: {
      position: 'absolute',
      bottom: 20,
    },
    linkText: {
      color: '#F595F2',
      textDecorationLine: 'underline',
      fontFamily: 'PoppinsRegular',
    },
    buttonText: {
      fontFamily: 'PoppinsRegular',
      fontSize: 16,
    },
  });

