import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';

import {styles} from './auth.style';

export default function LoginScreen() {
    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     expoClientId: 'YOUR_EXPO_CLIENT_ID',
    // });

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/icon.png')} // Logo fayli
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Salib yurishlari ilovasiga xush kelibsiz!</Text>
            <TouchableOpacity
                style={styles.googleButton}
                onPress={() => console.log('tap')}
                // onPress={() => promptAsync()}
                // disabled={!request}
            >
                <Text style={styles.buttonText}>Gmail bilan kirish</Text>
            </TouchableOpacity>
        </View>
    );
}
