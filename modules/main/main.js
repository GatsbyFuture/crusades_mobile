import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from './main.style';
import axios from 'axios';
import {mockFacts} from '../../mock/facts';

export default function HomeScreen() {
    const [facts, setFacts] = useState([]);
    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     axios
    //         .get('YOUR_API_URL/fact', {
    //             headers: {Authorization: `Bearer YOUR_JWT_TOKEN`},
    //         })
    //         .then((response) => setFacts(response.data))
    //         .catch((error) => console.error(error));
    // }, []);

    useEffect(() => {
        setTimeout(() => {
            setFacts(mockFacts);
        }, 1000);
    }, []);

    const filteredFacts = facts.filter((fact) =>
        fact.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Fakt qidirish..."
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredFacts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.factCard}>
                        <Text style={styles.factTitle}>{item.title}</Text>
                        <Text style={styles.factContent}>{item.content.slice(0, 100)}...</Text>
                        <View style={styles.factStats}>
                            <Text>{item.likes.length} Likes</Text>
                            <Text>{item.comments.length} Fikrlar</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}