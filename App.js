import { StatusBar } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './redux/reducers/mainReducer'

export default function App() {

  const store = configureStore({ reducer: mainReducer });
  const { height, width } = useWindowDimensions();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}