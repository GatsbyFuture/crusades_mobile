import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {useSearch} from '../search/search';
import {MaterialIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Custom Screens
import HomeScreen from '../../modules/main/main';
import SettingsScreen from '../../modules/setgs/setgs';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
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