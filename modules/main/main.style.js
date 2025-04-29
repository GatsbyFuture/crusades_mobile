import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#FFF',
    },
    searchInput: {
        height: 45,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    factCard: {
        backgroundColor: '#F9F9F9',
        padding: 15,
        borderRadius: 5,
        marginBottom: 5,
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