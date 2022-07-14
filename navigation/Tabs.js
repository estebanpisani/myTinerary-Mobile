import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Stack from './Stack';
import Home from './../screens/Home';

import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName='Stack'
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { height: 45, backgroundColor: '#00695c' }
            }}>
            <Tab.Screen
                name='Stack'
                component={Stack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={24} color="white" />
                }}
            />
            <Tab.Screen
                name='Account'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={24} color="white" />
                }}
            />
        </Tab.Navigator>
    )
}