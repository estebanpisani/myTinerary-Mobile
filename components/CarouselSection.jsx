import { StyleSheet, useWindowDimensions, ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import carouselBg from './../assets/home-carrousel.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useState, useEffect } from 'react';
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
        carouselContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
            flex: 1
        },
        carouselContent: {
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            height: '100%',
            backgroundColor: '#00000030',
            paddingVertical: 85
        }
    });

    useEffect(() => {
        dispatch(cityActions.getCities());
        // eslint-disable-next-line
    }, []);

    const cities = useSelector(store => store.cityReducer.cities);

    return (
        <ImageBackground style={styles.carouselContainer} source={carouselBg} resizeMethod='auto' resizeMode="cover" >
            <View style={styles.carouselContent} >
                <Text style={[styles.fonts.title, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center]} >Popular MyTineraries!</Text>

                {/* {cities.length > 0 && */}
                {/* // < SwiperFlatList */}
                {/* //     autoplay */}
                {/* //     autoplayDelay={2} */}
                {/* //     autoplayLoop */}
                {/* //     index={2} */}
                {/* //     showPagination */}
                {/* //     data={cities} */}
                {/* //     renderItem={({ city }) => */}
                {/* //         <View style={{ backgroundColor: 'blue' }}> */}
                {/* //             <Text >{city?.name}</Text> */}
                {/* //         </View> */}
                {/* //     } */}
                {/* // /> */}
                {/* // } */}
            </View>
        </ImageBackground>
    )
}

export default CarouselSection;
