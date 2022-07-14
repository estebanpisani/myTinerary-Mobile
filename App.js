import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useWindowDimensions } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './redux/reducers/mainReducer'

import Cities from './pages/Cities';
import City from './pages/City';
import Home from './pages/Home';
// import NavBar from './components/NavBar';

export default function App() {

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      width: width,
      height: height,
      flex: 3
    },
    navbar: {
      width: width,
      flex: 10
    }
  });

  const store = configureStore({ reducer: mainReducer });
  const { height, width } = useWindowDimensions();
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <View style={styles.content}>
        <StatusBar />
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="Home" component={Home} /> */}
            <Stack.Screen name="Cities" component={Cities} />
            <Stack.Screen name="City" component={City} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}