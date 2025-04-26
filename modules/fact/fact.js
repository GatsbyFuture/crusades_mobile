import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from './fact.style';
import axios from 'axios';
import {mockFacts} from '../../mock/facts';


export default function FactDetailScreen({route}) {
    const {fact_id} = route.params;
    const [fact, setFact] = useState(null);
    const [comment, setComment] = useState('');

    // useEffect(() => {
    //     axios.get(`YOUR_API_URL/facts/${fact_id}`, {
    //         headers: {Authorization: `Bearer YOUR_JWT_TOKEN`},
    //     }).then((response) => setFact(response.data)).catch((error) => console.error(error));
    // }, [fact_id]);
    useEffect(() => {
        const fit_fact = mockFacts.find(fact => fact._id === fact_id);
        setFact(mockFacts[fit_fact]);
    })

    const handleCommentSubmit = () => {
        axios.post(
            `YOUR_API_URL/comments`,
            {fact_id, content: comment},
            {headers: {Authorization: `Bearer YOUR_JWT_TOKEN`}}
        ).then(() => {
            setComment('');
            // Faktni qayta yuklash
        }).catch((error) => console.error(error));
    };

    if (!fact) return <Text>Yuklanmoqda...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.factTitle}>{fact.title}</Text>
            <Text style={styles.factContent}>{fact.content}</Text>
            <TouchableOpacity style={styles.likeButton}>
                <Text>{fact.likes.length} Likes</Text>
            </TouchableOpacity>
            <FlatList
                data={fact.comments}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                    <View style={styles.commentCard}>
                        <Text style={styles.commentAuthor}>{item.userId.username}</Text>
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