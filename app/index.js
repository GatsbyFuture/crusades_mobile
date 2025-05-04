import * as Device from 'expo-device';
import {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchProvider} from '../components/search/search';
import axios from 'axios';
// custom component
import Navigator from '../components/navgts/pages.navgts';

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

    if (isLoading) {
        return null;
    }

    return (
        <SearchProvider>
            <Navigator user={user}/>
        </SearchProvider>
    );
}