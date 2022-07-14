import { StyleSheet, useWindowDimensions, ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import heroBg from './../assets/home-hero.jpg'

const Hero = ({ navigation }) => {
    const { height, width } = useWindowDimensions();

    const styles = StyleSheet.create({
        fonts: {
            title: { fontSize: 50 },
            slogan: { fontSize: 30 },
            normal: { fontSize: 15 }
        },
        text: {
            primary: { color: "#00695c" },
            light: { color: "#f7f3f3" },
            center: { textAlign: 'center' },
            shadowLight: {
                textShadowColor: '#fff',
                textShadowOffset: { width: 2, height: 2 },
                textShadowRadius: 1
            },
            shadowPrimary: {
                textShadowColor: '#00695c',
                textShadowOffset: { width: 3, height: 1 },
                textShadowRadius: 1
            },
            shadowBlurLight: {
                textShadowColor: '#fff',
                textShadowOffset: { width: 3, height: 0 },
                textShadowRadius: 3
            },
            shadowBlurPrimary: {
                textShadowColor: '#00695c',
                textShadowOffset: { width: 3, height: 0 },
                textShadowRadius: 3
            }
        },
        heroContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
            flex: 1
        },
        heroContent: {
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000030',
            paddingVertical: 85
        },
        cta: {
            container: {
                paddingHorizontal: 20,
                borderWidth: 2,
                borderColor: 'white',
                backgroundColor: '#00695c',
                textAlign: "center",
                justifyContent: 'center',
                height: 45
            },
            text: {
                textTransform: "uppercase",
                color: 'white'
            }
        }

    });

    return (
        <ImageBackground style={styles.heroContainer} source={heroBg} resizeMethod='auto' resizeMode="cover" >
            <View style={styles.heroContent} >
                <Text variant='h1' style={[styles.fonts.title, styles.text.light, styles.text.shadowBlurPrimary]} >MyTinerary</Text>
                <Text variant='h3' style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary]} >Find Your Perfect Trip</Text>
                <Text style={[styles.fonts.normal, styles.text.light, styles.text.center, styles.text.shadowPrimary]}>Designed by insiders who know and love
                    their cities!
                </Text>
                <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={navigation.navigate('Cities')}>
                    <View style={styles.cta.container}>
                        <Text style={styles.cta.text}>
                            Get Started!
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default Hero;