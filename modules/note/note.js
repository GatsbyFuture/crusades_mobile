import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);

    // useEffect(() => {
    //     axios.get('YOUR_API_URL/notifications', {
    //         headers: {Authorization: `Bearer YOUR_JWT_TOKEN`},
    //     }).then((response) => setNotifications(response.data)).catch((error) => console.error(error));
    // }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View
                        style={[
                            styles.notificationCard,
                            {backgroundColor: item.isRead ? '#FFF' : '#FFE0E0'},
                        ]}
                    >
                        <Text style={styles.notificationText}>{item.message}</Text>
                        <Text style={styles.notificationTime}>
                            {new Date(item.createdAt).toLocaleString()}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    notificationCard: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    notificationTime: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
});