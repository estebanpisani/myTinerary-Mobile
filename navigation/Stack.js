import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './../screens/Home';
import Cities from './../screens/Cities';
import City from './../screens/City';
import Itinerary from './../screens/Itinerary';

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
                        <CityStackNavigator.Screen
                name='Itinerary'
                component={Itinerary}
                options={{
                    headerShown: false
                }}
            />
        </CityStackNavigator.Navigator>
    )

}
