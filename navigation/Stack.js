import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cities from './../screens/Cities';
import City from './../screens/City';
import Home from './../screens/Home';

const CityStackNavigator = createNativeStackNavigator();

export default function Stack() {
    return (
        <CityStackNavigator.Navigator
            initialRouteName='Home'
        >
            <CityStackNavigator.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <CityStackNavigator.Screen
                name='Cities'
                component={Cities}
                options={{
                    headerShown: false
                }}
            />
            <CityStackNavigator.Screen
                name='City'
                component={City}
                options={{
                    headerShown: false
                }}
            />
        </CityStackNavigator.Navigator>
    )

}
