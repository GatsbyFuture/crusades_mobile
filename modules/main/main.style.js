import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF',
    },
    searchInput: {
        height: 40,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
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
    factContent: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    factStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});