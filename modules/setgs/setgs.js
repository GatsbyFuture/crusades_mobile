import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    Appearance,
    Modal,
    FlatList,
    Linking
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from './setgs.style';
import axios from 'axios';
import {config} from '../../config/config';
import * as Device from 'expo-device';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
    const [selectedLanguage, setSelectedLanguage] = useState('uz');
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [deviceId, setDeviceId] = useState('');

    const [userUpdated, setUserUpdated] = useState(false);


    const languages = [
        {id: 'uz', name: 'O\'zbek'},
        {id: 'en', name: 'English'},
        {id: 'ru', name: 'Русский'},
    ];

    useEffect(() => {
        const id = Device.deviceId || Device.osInternalBuildId || Device.deviceName;
        setDeviceId(id || 'Unknown');

        axios.get(
            `${config.URL}/users/get-one`,
            {
                mobile_id: deviceId,
                lang: selectedLanguage,
                dark_mode: isDarkMode,
                notifications: isNotificationsEnabled
            },
            {
                Authorization: `Bearer YOUR_JWT_TOKEN`
            }
        ).then(response => {
            const {data: {_id, lang, dark_mode, notifications}} = response.data;
            if (_id) {
                setSelectedLanguage(lang);
                setIsDarkMode(dark_mode);
                setIsNotificationsEnabled(notifications);
            }
        }).catch(() => {
            alert('Ma\'lumotlar uzotishda xatolik bo\'ldi iltimos qayta urinib ko\'ring')
        });
    }, []);

    const toggleNotifications = () => {
        setIsNotificationsEnabled((prev) => !prev);
        setUserUpdated(true);
        console.log('Notifications:', isNotificationsEnabled ? 'O\'chirildi' : 'Yoqildi');
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        setUserUpdated(true);
        console.log('Dark mode:', isDarkMode ? 'O\'chirildi' : 'Yoqildi');
    };

    const selectLanguage = (langId) => {
        setSelectedLanguage(langId);
        setLanguageModalVisible(false);
        setUserUpdated(true);
        console.log('Selected language:', langId);
    };

    // patch for updated user settings
    const toggleUpdateChanges = () => {
        const device_id = Device.deviceId || Device.osInternalBuildId || Device.deviceName;

        axios.patch(
            `${config.URL}/users/update`,
            {
                mobile_id: deviceId,
                lang: selectedLanguage,
                dark_mode: isDarkMode,
                notifications: isNotificationsEnabled
            },
            {
                Authorization: `Bearer YOUR_JWT_TOKEN`
            }
        ).then(response => {
            const {data: user_data} = response.data;
            if (user_data) {
                setUserUpdated(false);
            }
        }).catch(error => {
            alert('Ma\'lumotlar uzotishda xatolik bo\'ldi iltimos qayta urinib ko\'ring')
            console.error('Usereni yangilashda xatolik', error);
        })

    }

    const handleFactPermission = () => {
        navigation.navigate('AddFactScreen');
    };

    const handleAdRequest = async () => {
        try {
            const url = 'https://t.me/jack_20010912';
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error('URL ochilmadi:', url);
            }
        } catch (error) {
            console.error('Xato:', error.message);
        }
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.settingItem}>
                <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Bildirishnomalarni yoqish
                </Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={toggleNotifications}
                    trackColor={{false: '#DDD', true: '#D32F2F'}}
                    thumbColor={isNotificationsEnabled ? '#FFF' : '#F4F3F4'}
                />
            </View>

            <View style={styles.settingItem}>
                <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Dark mode
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{false: '#DDD', true: '#D32F2F'}}
                    thumbColor={isDarkMode ? '#FFF' : '#F4F3F4'}
                />
            </View>

            <View style={styles.settingItemLang}>
                <Text style={[styles.settingText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Til: {languages.find((lang) => lang.id === selectedLanguage)?.name}
                </Text>
                <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
                    <MaterialIcons name="language" size={24} color={isDarkMode ? '#FFF' : '#333'}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: isDarkMode ? '#D32F2F' : '#F4F3F4',
                    ...styles.settingButton,
                    display: userUpdated ? 'block' : 'none'
                }}
                onPress={toggleUpdateChanges}>
                <Text style={[styles.settingButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
                    O'zgarishlarni saqlash
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: isDarkMode ? '#D32F2F' : '#F4F3F4', ...styles.settingButton}}
                              onPress={handleFactPermission}>
                <Text style={[styles.settingButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Fakt qo'shish uchun ruxsat so'rash
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.settingButton, {backgroundColor: isDarkMode ? '#D32F2F' : '#F4F3F4'}]}
                onPress={handleAdRequest}
            >
                <Text style={[styles.settingButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Reklama berish uchun murojaat
                </Text>
            </TouchableOpacity>

            <Modal visible={languageModalVisible} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, isDarkMode ? styles.darkModal : styles.lightModal]}>
                        <Text style={[styles.modalHeader, isDarkMode ? styles.darkText : styles.lightText]}>
                            Tilni tanlang
                        </Text>
                        <FlatList
                            data={languages}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.languageItem}
                                    onPress={() => selectLanguage(item.id)}
                                >
                                    <Text
                                        style={[styles.languageText, isDarkMode ? styles.darkText : styles.lightText]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setLanguageModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Yopish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}