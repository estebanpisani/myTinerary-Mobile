import { StyleSheet, useWindowDimensions, ImageBackground, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import carouselBg from './../assets/home-carrousel.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_500Medium } from '@expo-google-fonts/comfortaa';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Charm_400Regular} from '@expo-google-fonts/charm';
import Carousel from 'react-native-snap-carousel';
import cityActions from './../redux/actions/cityActions';

const CarouselSection = () => {
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

    let [fontsLoaded] = useFonts({
        Comfortaa_500Medium,
        Charm_400Regular,
        Cookie_400Regular
    })


    const styles = StyleSheet.create({
        fonts: {
            title: { fontSize: 50, fontFamily: 'Cookie_400Regular' },
            slogan: { fontSize: 30, fontFamily: 'Charm_400Regular' },
            normal: { fontSize: 15, fontFamily: 'Comfortaa_500Medium' }
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
        carouselSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: width,
            flex: 1,
            height: height,
            padding: 20
        },
        carouselContainer: {
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            width: '80%',
            height: '50%',
        },
        carouselItem: {
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderWidth: 3,
            borderColor: 'white',
            backgroundColor: 'rgba(0,0,0,0.09)'
        }
    });

    useEffect(() => {
        dispatch(cityActions.getCities());
        // eslint-disable-next-line
    }, [cities]);

    const cities = useSelector(store => store.cityReducer.cities).slice(0, 11);

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ImageBackground style={styles.carouselSection} source={carouselBg} resizeMethod='auto' resizeMode="cover" >
            <Text style={[styles.fonts.title, styles.text.primary, styles.text.shadowBlurLight, styles.text.center]} >Popular MyTineraries!</Text>
            {cities.length > 0 &&
                <View style={styles.carouselContainer}>
                    <Carousel
                        autoplay
                        autoplayDelay={1000}
                        autoplayInterval={3000}
                        lockScrollWhileSnapping={true}
                        enableMomentum={false}
                        loop
                        inactiveSlideOpacity={0.3}
                        data={cities}
                        renderItem={({ item, index }) =>
                            <ImageBackground key={index} source={{ uri: item.image }}>
                                <View style={styles.carouselItem} >
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 40 }]} >{item.name}</Text>
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 30 }]}>{item.country}</Text>
                                </View>
                            </ImageBackground>
                        }
                        sliderWidth={width}
                        itemWidth={width - 70}
                    />
                </View>
            }
        </ImageBackground >
    )
}

export default CarouselSection;
