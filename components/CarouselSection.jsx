import { StyleSheet, useWindowDimensions, ImageBackground, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import carouselBg from './../assets/home-carrousel.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import Carousel from 'react-native-snap-carousel';

import cityActions from './../redux/actions/cityActions';

const CarouselSection = () => {
    const { height, width } = useWindowDimensions();
    const dispatch = useDispatch();

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
        carouselSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: width,
            flex: 1,
            height: height,
            padding:20
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

    return (
        <ImageBackground style={styles.carouselSection} source={carouselBg} resizeMethod='auto' resizeMode="cover" >
            <Text style={[styles.fonts.title, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center]} >Popular MyTineraries!</Text>
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
                            <ImageBackground key={index}  source={{ uri: item.image }}>
                                <View style={styles.carouselItem} >
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, {fontSize:40}]} >{item.name}</Text>
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center,{fontSize:30}]}>{item.country}</Text>
                                </View>
                            </ImageBackground>
                        }
                        sliderWidth={width}
                        itemWidth={width-70}
                    />
                </View>
            }
        </ImageBackground >
    )
}

export default CarouselSection;
