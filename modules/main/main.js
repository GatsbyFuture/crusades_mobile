import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSearch} from '../../components/search/search';
import {styles} from './main.style';
import axios from 'axios';
import {mockFacts} from '../../mock/facts';

export default function HomeScreen() {
    const [facts, setFacts] = useState([]);
    const [search, setSearch] = useState('');
    const navigation = useNavigation(); // React Navigation'dan navigatsiya uchun
    const {searchInputRef} = useSearch(); // Kontekst dan ref

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
                ref={searchInputRef}
                style={styles.searchInput}
                placeholder="Fakt qidirish..."
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={filteredFacts}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.factCard}
                        onPress={() => navigation.navigate('FactDetail', {fact_id: item._id})} // Fakt ID si bilan navigatsiya
                    >
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

// Fokus funksiyasini eksport qilish
export const focusSearchInput = () => {
    if (HomeScreen.searchInputRef && HomeScreen.searchInputRef.current) {
        HomeScreen.searchInputRef.current.focus();
    }
};