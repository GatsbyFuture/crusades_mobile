import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

export default function ProfileScreen() {
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState('');

    // useEffect(() => {
    //     axios.get('YOUR_API_URL/users/me', {
    //         headers: {Authorization: `Bearer YOUR_JWT_TOKEN`},
    //     }).then((response) => {
    //         setUser(response.data);
    //         setBio(response.data.profile.bio || '');
    //     }).catch((error) => console.error(error));
    // }, []);

    const handleBioUpdate = () => {
        axios.patch(
            'YOUR_API_URL/users/me',
            {profile: {bio}},
            {headers: {Authorization: `Bearer YOUR_JWT_TOKEN`}}
        ).then(() => alert('Bio yangilandi!')).catch((error) => console.error(error));
    };

    if (!user) return <Text>Yuklanmoqda...</Text>;

    return (
        <View style={styles.container}>
            <Image
                source={{uri: user.profile.avatar || 'https://via.placeholder.com/100'}}
                style={styles.avatar}
            />
            <Text style={styles.username}>{user.username}</Text>
            <TextInput
                style={styles.bioInput}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio yozing..."
                multiline
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleBioUpdate}>
                <Text style={styles.updateButtonText}>Bio'ni yangilash</Text>
            </TouchableOpacity>
            <FlatList
                data={user.facts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.factCard}>
                        <Text style={styles.factTitle}>{item.title}</Text>
                        <Text>{item.content.slice(0, 100)}...</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Chiqish</Text>
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    bioInput: {
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginVertical: 10,
        minHeight: 80,
    },
    updateButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    updateButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    factCard: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    factTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#666',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});