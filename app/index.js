import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialIcons} from '@expo/vector-icons';
import LoginScreen from '@/modules/auth/auth';
import HomeScreen from '@/modules/main/main';
import FactDetailScreen from '@/modules/fact/fact';
import ProfileScreen from '@/modules/prof/prof';
import NotificationsScreen from '@/modules/note/note';
import SettingsScreen from '@/modules/setgs/setgs';
import AddFactScreen from '@/modules/fact/add.fact';
import {SearchProvider, useSearch} from '../components/search/search';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    const navigation = useNavigation();
    const {focusSearchInput} = useSearch();
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName;
                    if (route.name === 'Home') iconName = 'home';
                    else if (route.name === 'Search') iconName = 'search';
                    else if (route.name === 'Settings') iconName = 'settings';
                    return <MaterialIcons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: '#D32F2F', // Faol tabning rangi (qizil)
                tabBarInactiveTintColor: '#666', // Nofaol tabning rangi (kulrang)
                tabBarIconStyle: {width: 30, height: 30}, // Ikonka o'lchamlari
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 5, // Pastdan bo'shliq
                    paddingTop: 5, // Yuqoridan bo'shliq
                    position: 'absolute', // Panelni erkin joylashtirish
                    // bottom: 20, // Ekranning pastidan 10px masofa
                    backgroundColor: '#FFF', // Fon rangi
                    borderTopWidth: 1,
                    borderTopColor: '#DDD',
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Bosh sahifa',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                            style={{marginRight: 12, padding: 5}}
                        >
                            <MaterialIcons name="notifications" size={25} color="#D32F2F"/>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={HomeScreen} // HomeScreen ishlatiladi
                options={{
                    title: 'Qidiruv',
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            {...props}
                            onPress={() => {
                                focusSearchInput(); // Faqat fokus qo'yish
                            }}
                        />
                    ),
                }}
            />
            {/*<Tab.Screen name="Profile" component={ProfileScreen} options={{title: 'Profil'}}/>*/}
            <Tab.Screen name="Settings" component={SettingsScreen} options={{title: 'Sozlamalar'}}/>
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <SearchProvider>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    cardStyleInterpolator: ({current}) => ({
                        cardStyle: {
                            opacity: current.progress,
                        },
                    }),
                }}
            >
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
                <Tab.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{
                        title: 'Bildirishnomalar',
                        headerTintColor: '#D32F2F', // Strelka va sarlavha rangi qizil
                        headerTitleStyle: {
                            color: '#333', // Sarlavha matni rangi (ixtiyoriy)
                        },
                    }}
                />
                <Stack.Screen
                    name="FactDetail"
                    component={FactDetailScreen}
                    options={{
                        title: 'Fakt tafsilotlari',
                        headerTintColor: '#D32F2F', // Strelka va sarlavha rangi qizil
                        headerTitleStyle: {
                            color: '#333', // Sarlavha matni rangi (ixtiyoriy)
                        },
                        //     ++++++++++
                        // headerRight: () => (
                        //     <TouchableOpacity
                        //         onPress={() => navigation.goBack()}
                        //         style={{marginLeft: 10, padding: 5}}
                        //     >
                        //         <MaterialIcons name="notifications" size={25} color="black"/>
                        //     </TouchableOpacity>
                        // ),
                        // headerStyle: {
                        //     backgroundColor: '#FFF', // Sarlavha paneli fon rangi
                        // },
                        // headerTitleStyle: {
                        //     color: '#333', // Sarlavha matni rangi
                        // },
                    }}
                />
                <Stack.Screen
                    name="AddFactScreen"
                    component={AddFactScreen}
                    options={{
                        title: 'Fact qo\'ish',
                        headerTintColor: '#D32F2F', // Strelka va sarlavha rangi qizil
                        headerTitleStyle: {
                            color: '#333', // Sarlavha matni rangi (ixtiyoriy)
                        },
                    }}
                />
            </Stack.Navigator>
        </SearchProvider>
    );
}