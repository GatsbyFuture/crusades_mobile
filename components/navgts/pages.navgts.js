import {createStackNavigator} from '@react-navigation/stack';
// Tab navigation
import TabNavigator from './buttom.navgt';
import LoginScreen from '../../modules/auth/auth';
import NotificationsScreen from '../../modules/note/note';
import FactDetailScreen from '../../modules/fact/fact';
import AddFactScreen from '../../modules/fact/add.fact';

const Stack = createStackNavigator();

export default function Navigator(data) {
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