import { StyleSheet, ScrollView, View, Button, TouchableHighlight, ImageBackground, Text } from 'react-native';

const NavBar = () => {
    const styles = {
        navContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems:'center',
            backgroundColor: '#00695c',
            minWidth:'100%',
            maxWidth: '100%',
            height: '100%',
            padding: 20
        }
    }
    return (
        <View style={styles.navContainer}>
            <Text>Home</Text>
            <Text>Cities</Text>
            <Text>Account</Text>
        </View>
    )
}

export default NavBar;