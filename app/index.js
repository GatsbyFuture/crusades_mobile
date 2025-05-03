import {useEffect, useState} from 'react';
import * as Device from 'expo-device';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@/modules/auth/auth';
import FactDetailScreen from '@/modules/fact/fact';
import NotificationsScreen from '@/modules/note/note';
import AddFactScreen from '@/modules/fact/add.fact';
import {SearchProvider} from '../components/search/search';
// Tab navigation
import TabNavigator from '../components/navgts/buttom.navgt';

const Stack = createStackNavigator();

function Navigator(data) {
    console.log('Navigator', data.user);
    return (
        <Stack.Navigator
            initialRouteName={data.user ? 'Main' : 'Login'}
            screenOptions={{
                cardStyleInterpolator: ({current}) => ({
                    cardStyle: {opacity: current.progress},
                }),
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Main" component={TabNavigator} options={{headerShown: false}}/>
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    title: 'Bildirishnomalar',
                    headerTintColor: '#D32F2F',
                    headerTitleStyle: {color: '#333'},
                }}
            />
            <Stack.Screen
                name="FactDetail"
                component={FactDetailScreen}
                options={{
                    title: 'Fakt tafsilotlari',
                    headerTintColor: '#D32F2F',
                    headerTitleStyle: {color: '#333'},
                }}
            />
            <Stack.Screen
                name="AddFactScreen"
                component={AddFactScreen}
                options={{
                    title: 'Fact qo\'shish',
                    headerTintColor: '#D32F2F',
                    headerTitleStyle: {color: '#333'},
                }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    const [deviceId, setDeviceId] = useState('');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Loading holati

    useEffect(() => {
        const checkUser = async () => {
            try {
                const id = Device.deviceId || Device.osInternalBuildId || Device.deviceName;
                setDeviceId(id || 'Unknown');

                const response = await axios.get('http://192.168.105.143:5000/users/get-one', {
                    params: {mobile_id: id},
                    // headers: { Authorization: `Bearer YOUR_JWT_TOKEN` }, // Haqiqiy token qo'shing
                });

                const {data: user_data} = response.data;

                setUser(user_data);
            } catch (error) {
                console.error('Xato:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        checkUser();
    }, []);

    // Loading vaqtida hech narsa ko'rsatmaymiz
    if (isLoading) {
        return null; // yoki loader component
    }

    return (
        <SearchProvider>
            <Navigator user={user}/>
        </SearchProvider>
    );
}