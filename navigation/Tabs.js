import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Stack from './Stack';
import AuthStack from './AuthStack';

import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: { height: 45, backgroundColor: '#00695c' }
            }}>
            <Tab.Screen
                name='Home'
                component={Stack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={24} color="white" />
                }}
            />
            <Tab.Screen
                name='Account'
                component={AuthStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={24} color="white" />
                }}
            />
        </Tab.Navigator>
    )
}