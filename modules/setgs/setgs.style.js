import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    lightContainer: {
        backgroundColor: '#FFF',
    },
    darkContainer: {
        backgroundColor: '#0d1117',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    lightText: {
        color: '#0d1117',
    },
    darkText: {
        color: '#FFF',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    settingItemLang: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingRight: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    settingText: {
        fontSize: 16,
    },
    settingButton: {
        padding: 16,
        marginTop: 18,
        borderRadius: 5,
    },
    settingButtonText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalContent: {
        marginHorizontal: 20,
        borderRadius: 8,
        padding: 16,
        maxHeight: '50%',
    },
    lightModal: {
        backgroundColor: '#FFF',
    },
    darkModal: {
        backgroundColor: '#444',
    },
    modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    languageItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    languageText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#D32F2F',
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});