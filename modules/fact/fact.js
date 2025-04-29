import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from './fact.style';
import axios from 'axios';
import {mockFacts} from '../../mock/facts';


export default function FactDetailScreen() {
    const [fact, setFact] = useState(null);
    const [comment, setComment] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const {fact_id} = route.params;
    console.log('fact_id:', fact_id);
    // useEffect(() => {
    //     axios.get(`YOUR_API_URL/facts/${fact_id}`, {
    //         headers: {Authorization: `Bearer YOUR_JWT_TOKEN`},
    //     }).then((response) => setFact(response.data)).catch((error) => console.error(error));
    // }, [fact_id]);

    useEffect(() => {
        const fit_fact = mockFacts.find(fact => fact._id === fact_id);
        setFact(fit_fact);
    }, [fact_id]);

    const handleCommentSubmit = () => {
        // axios.post(
        //     `YOUR_API_URL/comments`,
        //     {fact_id, content: comment},
        //     {headers: {Authorization: `Bearer YOUR_JWT_TOKEN`}}
        // ).then(() => {
        //     setComment('');
        //     // Faktni qayta yuklash
        // }).catch((error) => console.error(error));
        console.log('comment:', comment);
    };

    if (!fact) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#D32F2F"/>
                </TouchableOpacity>
                <Text style={styles.error}>Fakt topilmadi!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={styles.factContent}>{fact.content}</Text>
            <TouchableOpacity style={styles.likeButton}>
                <Text style={styles.likeText}>{fact.likes.length} Likes</Text>
            </TouchableOpacity>
            <FlatList
                data={fact.comments}
                keyExtractor={(item, index) => index.toString()} // Kommentlarda _id bo'lmasligi mumkin
                renderItem={({item}) => (
                    <View style={styles.commentCard}>
                        <Text style={styles.commentAuthor}>{item.userId?.username || 'Anonim'}</Text>
                        <Text>{item.content}</Text>
                    </View>
                )}
            />
            <View style={styles.commentInputContainer}>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Fikr qoldiring..."
                    value={comment}
                    onChangeText={setComment}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                    <Text style={styles.submitButtonText}>Yuborish</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}