import { View, Text, TouchableOpacity } from 'react-native';

const NavBar = () => {
    const styles = {
        navContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#000',
            minWidth: '100%',
            height: '100%',
        },
        navItem: {
            backgroundColor: '#00695c',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        },
        borderEnd: {
            borderEndWidth: 1,
            borderColor: 'white',
        }
    }
    return (
        <View style={styles.navContainer}>
            <TouchableOpacity underlayColor="#000" activeOpacity={0.8} style={[styles.navItem, styles.borderEnd]}>
                <Text >
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="#000" activeOpacity={0.8} style={[styles.navItem, styles.borderEnd]}>
                <Text >
                    Cities
                </Text>
            </TouchableOpacity>
            <TouchableOpacity underlayColor="#000" activeOpacity={0.8} style={[styles.navItem]}>
                <Text >
                    Account
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NavBar;