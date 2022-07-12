import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, ViewBase } from 'react-native';
import Home from './pages/Home.jsx';
import NavBar from './components/NavBar';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#000',
    height: '100%'
  },
  content: {
    flex: 8,
    width: '100%'
  },
  navbar: {
    flex: 1,
  }
});

export default function App() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content} >
          <Home />
        </View>
        <View style={styles.navbar}>
          <NavBar />
        </View>
      </ScrollView>
  );
}