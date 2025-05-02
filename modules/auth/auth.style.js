import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '98%',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 18,
        marginBottom: 15,
        color: '#333',
        fontFamily: 'TimesNewRoman',
    },
    button: {
        width: '90%',
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 3,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DDD',
        borderRadius: 3,
        paddingHorizontal: 15,
        marginBottom: 16,
        fontSize: 16
    },
    picker: {
        height: 50,
        fontSize: 13,
        color: '#333',
    },
    pickerContainer: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 3,
        marginBottom: 16,
        overflow: 'hidden', // iOS da to'g'ri ko'rinish uchun
    },
});