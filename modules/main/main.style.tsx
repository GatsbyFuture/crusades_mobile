import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        color: '#333',
        marginBottom: 30,
        fontFamily: 'TimesNewRoman',
    },
    googleButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});