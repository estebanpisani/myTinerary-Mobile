import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUp from './../screens/SignUp';
import Login from './../screens/Login';
import Profile from './../screens/Profile';

const AuthNavigator = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <AuthNavigator.Navigator
            initialRouteName='Login'
        >
            <AuthNavigator.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <AuthNavigator.Screen
                name='SignUp'
                component={SignUp}
                options={{
                    headerShown: false
                }}
            />
            <AuthNavigator.Screen
                name='Profile'
                component={Profile}
            />
        </AuthNavigator.Navigator>
    )

}
