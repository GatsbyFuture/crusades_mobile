import React, {useState, useEffect} from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet, Appearance, Modal, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';

export default function SettingsScreen() {
    const navigation = useNavigation();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === 'dark');
    const [selectedLanguage, setSelectedLanguage] = useState('uz');
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

    const languages = [
        {id: 'uz', name: 'O\'zbek'},
        {id: 'en', name: 'English'},
        {id: 'ru', name: 'Русский'},
    ];

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({colorScheme}) => {
            setIsDarkMode(colorScheme === 'dark');
        });
        return () => subscription.remove();
    }, []);

    const toggleNotifications = () => {
        setIsNotificationsEnabled((prev) => !prev);
        console.log('Notifications:', isNotificationsEnabled ? 'O\'chirildi' : 'Yoqildi');
    };

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        console.log('Dark mode:', isDarkMode ? 'O\'chirildi' : 'Yoqildi');
    };

    const selectLanguage = (langId) => {
        setSelectedLanguage(langId);
        setLanguageModalVisible(false);
        console.log('Selected language:', langId);
    };

    const handleFactPermission = () => {
        navigation.navigate('AddFactScreen');
    };

    const handleAdRequest = () => {
        console.log('Reklama berish uchun murojaat yuborildi');
        alert('Reklama murojaatingiz qabul qilindi. Tez orada bog\'lanamiz!');
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <Text style={[styles.header, isDarkMode ? styles.darkText : styles.lightText]}>Sozlamalar</Text>

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
                    Til: {languages.find((lang) => lang.id === selectedLanguage)?.name}
                </Text>
                <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
                    <MaterialIcons name="language" size={24} color={isDarkMode ? '#FFF' : '#333'}/>
                </TouchableOpacity>
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

            <TouchableOpacity style={styles.settingButton} onPress={handleFactPermission}>
                <Text style={[styles.settingButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Fakt qo'shish uchun ruxsat so'rash
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton} onPress={handleAdRequest}>
                <Text style={[styles.settingButtonText, isDarkMode ? styles.darkText : styles.lightText]}>
                    Reklama berish uchun murojaat
                </Text>
            </TouchableOpacity>

            <Modal visible={languageModalVisible} animationType="slide" transparent>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    lightContainer: {
        backgroundColor: '#FFF',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    lightText: {
        color: '#333',
    },
    darkText: {
        color: '#FFF',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    settingText: {
        fontSize: 16,
    },
    settingButton: {
        padding: 16,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: '#F4F3F4',
    },
    settingButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 16,
        maxHeight: '50%',
    },
    lightModal: {
        backgroundColor: '#FFF',
    },
    darkModal: {
        backgroundColor: '#444',
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    languageItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    languageText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});