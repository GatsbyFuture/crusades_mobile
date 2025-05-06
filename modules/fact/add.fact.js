import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FileUploadComponent from '../../components/fileUpload/file.upload';
import {mockFacts} from '../../mock/facts';
import * as Device from 'expo-device';

export default function AddFactScreen() {
    const navigation = useNavigation();
    const [deviceId, setDeviceId] = useState('');

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    useEffect(() => {
        const id = Device.deviceId || Device.osInternalBuildId || Device.deviceName;
        setDeviceId(id || 'Unknown');
    }, []);

    const handleSubmit = () => {
        if (!title || !content || !category) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!');
            return;
        }

        const newFact = {
            _id: Date.now().toString(),
            title,
            content,
            category,
            createdBy: 'user1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
            likes: [],
            comments: [],
            isApproved: true,
        };

        // addFact(newFact);
        mockFacts.push(newFact);
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Yangi fakt qo'shish</Text>

            <Text style={styles.label}>Sarlavha</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Masalan: Birinchi salib yurishi"
            />

            <FileUploadComponent deviceId={deviceId}/>

            <Text style={styles.label}>Qisqacha ma'lumot</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setSummary}
                placeholder="Masalan: Hujum qayerga yo'nalgan..."
            />

            <Text style={styles.label}>Tavsif</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={content}
                onChangeText={setContent}
                placeholder="To'liq ma'lumot..."
                multiline
                numberOfLines={5}
            />

            <Text style={styles.label}>Video taglar qo'shish</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setSummary}
                placeholder="Masalan: https://youtube.com/salib..."
            />

            <Text style={styles.label}>Kategoriya</Text>
            <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholder="Masalan: Tarix"
            />

            <Text style={styles.label}>Teglar (vergul bilan ajrating)</Text>
            <TextInput
                style={styles.input}
                value={tags}
                onChangeText={setTags}
                placeholder="Masalan: Quddus, Ritsarlar"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Saqlash</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 11,
        marginBottom: 16,
        fontSize: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#D32F2F',
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});