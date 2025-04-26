import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import LoginScreen from '@/modules/auth/auth';
import HomeScreen from '@/modules/main/main';
import FactDetailScreen from '@/modules/fact/fact';
import ProfileScreen from '@/modules/prof/prof';
import NotificationsScreen from '@/modules/note/note';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Profile') {
                        iconName = 'person';
                    } else if (route.name === 'Notifications') {
                        iconName = 'notifications';
                    } else {
                        console.log('Unknown route:', route.name); // Nosozliklarni aniqlash
                        iconName = 'circle'; // Zaxira ikonka
                    }
                    return <MaterialIcons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: '#007AFF', // Faol tab rangi
                tabBarInactiveTintColor: 'gray', // Faol bo‘lmagan tab rangi
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Uy'}}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{title: 'Profil'}}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{title: 'Bildirishnomalar'}}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Main"
                    component={TabNavigator}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="FactDetail"
                    component={FactDetailScreen}
                    options={{title: 'Fakt tafsilotlari'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}