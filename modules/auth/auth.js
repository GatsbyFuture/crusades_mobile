import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './auth.style';

export default function LoginScreen() {
    const [full_name, setFullName] = useState('');
    const [language, setLanguage] = useState('uz');

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
                    onPress={() => console.log('tap', {full_name, language})}
                >
                    <Text style={styles.buttonText}>Ilovaga kirish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}