import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    factTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    factContent: {
        fontSize: 16,
        color: '#666',
        marginVertical: 10,
    },
    likeButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    commentCard: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    commentAuthor: {
        fontWeight: 'bold',
        color: '#333',
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#DDD',
    },
    commentInput: {
        flex: 1,
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    submitButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        borderRadius: 8,
        marginLeft: 10,
    },
    submitButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});