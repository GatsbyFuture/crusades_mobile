import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Alert, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import {config} from '../../config/config'; // config faylini import qiling

export default function FileUploadComponent({deviceId}) {
    const [uploading, setUploading] = useState(false);

    const handleFilePick = async () => {
        try {
            // Fayl tanlash
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Barcha fayl turlari
                copyToCacheDirectory: true, // Faylni keshga ko'chirish
            });

            if (!result.canceled && result.assets) {
                const file = result.assets[0];
                // Faylni Base64 ga aylantirish
                const fileData = await FileSystem.readAsStringAsync(file.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                setUploading(true);

                // Backendga yuborish
                const response = await axios.post(
                    `${config.URL}/facts/create`,
                    {
                        deviceId,
                        file: `data:${file.mimeType};base64,${fileData}`,
                        fileName: file.name,
                    },
                    {
                        headers: {
                            Authorization: `Bearer YOUR_JWT_TOKEN`, // Haqiqiy token bilan almashtiring
                            'Content-Type': 'application/json',
                        },
                    }
                );

                Alert.alert('Muvaffaqiyat', 'Fayl muvaffaqiyatli yuborildi!');
                console.log('Response:', response.data);
            } else {
                console.log('Fayl tanlash bekor qilindi');
            }
        } catch (error) {
            Alert.alert('Xato', 'Fayl yuborishda xatolik yuz berdi');
            console.error('Xato:', error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleFilePick}
                disabled={uploading}
            >
                <Text style={styles.buttonText}>
                    {uploading ? 'Yuborilmoqda...' : 'Fayl tanlash va yuborish'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#D32F2F'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    darkText: {
        color: '#FFFFFF',
    },
    lightText: {
        color: '#333333',
    },
});