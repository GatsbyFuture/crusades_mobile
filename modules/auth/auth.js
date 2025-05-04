import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import * as Device from 'expo-device';
import {styles} from './auth.style';
import axios from 'axios';
import {config} from '../../config/config';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [deviceId, setDeviceId] = useState('');
    const [full_name, setFullName] = useState('');
    const [language, setLanguage] = useState('uz');

    useEffect(() => {
        const id = Device.deviceId || Device.osInternalBuildId || Device.deviceName;
        setDeviceId(id || 'Unknown');
    }, []);

    const handleSubmit = () => {
        if (!full_name.trim()) {
            alert('Iltimos, F.I.O kiriting!');
            return;
        }
        if (!language) {
            alert('Iltimos, tilni tanlang!');
            return;
        }

        axios.post(
            `${config.URL}/users/create`,
            {
                mobile_id: deviceId,
                full_name: full_name,
                lang: language,
            },
            {
                Authorization: `Bearer YOUR_JWT_TOKEN`
            }
        ).then(response => {
            const {data: user_data} = response.data;
            if (user_data) {
                navigation.navigate('Main');
            }
        }).catch(error => {
            alert('Ma\'lumotlar uzotishda xatolik bo\'ldi iltimos qayta urinib ko\'ring')
            console.error('Usereni jo\'natishda xatolik', error);
        })
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