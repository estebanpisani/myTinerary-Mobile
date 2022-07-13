import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './redux/reducers/mainReducer'
import { useWindowDimensions } from 'react-native';
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider, Layout } from '@ui-kitten/components';
import Cities from './pages/Cities';
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

  return (
    <Provider store={store}>
        <View style={styles.content}>
          <StatusBar />
          <Cities />
        </View>
    </Provider>
  );
}