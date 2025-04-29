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
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Profile') iconName = 'person';
                    else if (route.name === 'Notifications') iconName = 'notifications';
                    return <MaterialIcons name={iconName} size={size} color={color}/>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Uy'}}/>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{title: 'Profil'}}/>
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
        <Stack.Navigator initialRouteName="Main">
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
    );
}
// import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import {View, Text, StyleSheet, Button} from 'react-native';
//
// const Stack = createStackNavigator();
//
// // Home Screen
// function HomeScreen({navigation}) {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Home Page</Text>
//             <Button
//                 title="Go to About"
//                 onPress={() => navigation.navigate('About')}
//             />
//             <Button
//                 title="Go to Notifications"
//                 onPress={() => navigation.navigate('Notification')}
//             />
//         </View>
//     );
// }
//
// // About Screen
// function AboutScreen({navigation}) {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>About Page</Text>
//             <Button
//                 title="Go to Home"
//                 onPress={() => navigation.navigate('Home')}
//             />
//             <Button
//                 title="Go to Notifications"
//                 onPress={() => navigation.navigate('Notification')}
//             />
//         </View>
//     );
// }
//
// // Notification Screen
// function NotificationScreen({navigation}) {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Notifications Page</Text>
//             <Button
//                 title="Go to Home"
//                 onPress={() => navigation.navigate('Home')}
//             />
//             <Button
//                 title="Go to About"
//                 onPress={() => navigation.navigate('About')}
//             />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20,
//     },
// });
//
// export default function App() {
//     return (
//         <Stack.Navigator initialRouteName="Home">
//             <Stack.Screen name="Home" component={HomeScreen}/>
//             <Stack.Screen name="About" component={AboutScreen}/>
//             <Stack.Screen name="Notification" component={NotificationScreen}/>
//         </Stack.Navigator>
//     );
// }