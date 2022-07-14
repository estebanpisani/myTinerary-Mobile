import { Button, ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, useWindowDimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCity from './../assets/city-body.jpg'

import { useDispatch, useSelector } from 'react-redux';

import cityActions from './../redux/actions/cityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const City = () => {
    const cityID = '62a8e7a4e9d388724d1b4f82'
    const dispatch = useDispatch();
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
        itinerariesSection: {
            width: width,
            height: height
        },
        cityContainer: {
            height: '50%',
            width: '100%',
            borderWidth: 4,
            justifyContent: 'center',
            alignItems: 'center'
        },
        cityDescription: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 7
        },
        itinerariesContainer: {
            minHeight: height / 2,
            padding: 10
        },
        itinerary: {
            width: "100%",
            height: 300,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.7)',
            marginVertical: 10,
            borderRadius: 25,
        },
        userInfo: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: '50%',
            width: '100%',
            padding: 10,
            borderBottomStartRadius: 25,
            borderBottomEndRadius: 25,
            backgroundColor: '#000'
        },
        userImage: {
            height: '70%',
            width: '30%',
            borderRadius: 50,
        },
        cta: {
            container: {
                paddingHorizontal: 10,
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 5,
                backgroundColor: '#00695c',
                textAlign: "center",
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
            },
            text: {
                textTransform: "uppercase",
                color: 'white'
            }
        },
    });

    useEffect(() => {
        dispatch(cityActions.getCityById(cityID));
        dispatch(itineraryActions.getItinerariesByCity(cityID));
        // eslint-disable-next-line
    }, []);
    let city = useSelector(store => store.cityReducer.city);
    let itineraries = useSelector(store => store.itineraryReducer.itineraries);

    return (
        <ImageBackground style={[styles.itinerariesSection, { flexGrow: 1 }]} source={bgCity} resizeMethod='auto' resizeMode="cover" >
            <ScrollView >
                {city &&
                    <ImageBackground source={{ uri: city.image }} style={{ height: height / 5, width: width, alignItems: 'center', justifyContent: 'center' }} resizeMethod='auto' resizeMode="cover" >
                        <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 40 }]}>{city.name}</Text>
                    </ImageBackground>
                }
                <View style={styles.itinerariesContainer}>
                    {itineraries.length > 0 && itineraries.map((itinerary, i) => {
                        return (
                            <View style={styles.itinerary} >
                                <View style={{ height: '50%', justifyContent: 'center', paddingHorizontal: 40 }} >
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 20, textAlign: 'center', marginBottom: 10 }]} >{itinerary.title}</Text>
                                    <Text style={[styles.fonts.slogan, styles.text.light, { fontSize: 10, textAlign: 'justify' }]} >{itinerary.description}</Text>
                                </View>
                                <View style={styles.userInfo}>
                                    <Image source={{ uri: itinerary.userPhoto }} style={styles.userImage} resizeMethod='auto' resizeMode='cover' />
                                    <View style={{ height: '100%', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{itinerary.userName}</Text>
                                        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Duration: {itinerary.duration}hs</Text>
                                        <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Price: ${itinerary.price}</Text>
                                        <TouchableOpacity underlayColor="#000" activeOpacity={0.6}>
                                            <View style={styles.cta.container}>
                                                <Text style={styles.cta.text}>
                                                    More Info
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

export default City;