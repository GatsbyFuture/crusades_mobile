import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as Device from 'expo-device';
import {styles} from './auth.style';
import axios from 'axios';

export default function LoginScreen() {
    const [full_name, setFullName] = useState('');
    const [language, setLanguage] = useState('uz');
    // const [deviceId, setDeviceId] = useState('');

    const handleSubmit = () => {
        if (!full_name.trim()) {
            alert('Iltimos, F.I.O kiriting!');
            return;
        }
        if (!language) {
            alert('Iltimos, tilni tanlang!');
            return;
        }
        console.log('Submitted:', {full_name, language, deviceId});
        // Backendga yuborish misoli:
        // fetch('http://api.example.com/users', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     fullName: full_name,
        //     language,
        //     deviceId,
        //     notificationsEnabled: true,
        //     darkMode: false,
        //     facts: [],
        //   }),
        // });
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Image
                    source={require('../../assets/custom/images/logo/logo.1.jpg')}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>Salib yurishlari ilovasiga xush kelibsiz!</Text>
                <TextInput
                    style={styles.input}
                    value={full_name}
                    onChangeText={setFullName}
                    placeholder="Iltimos ismingizni kiriting"
                />
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={language}
                        onValueChange={(itemValue) => setLanguage(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="O'zbek" value="oz"/>
                        <Picker.Item label="English" value="en"/>
                        <Picker.Item label="Русский" value="ru"/>
                    </Picker>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Ilovaga kirish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}