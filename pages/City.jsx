import {Button, ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, useWindowDimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCity from './../assets/city-body.jpg'

import { useDispatch, useSelector } from 'react-redux';

import cityActions from './../redux/actions/cityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const City = ({ route, navigation }) => {
    const cityID = route.params.id
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const [search, setSearch] = useState('');
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
            display: 'flex',
            alignItems: 'center',
            width: width,
            height: height,
            flex: 1
        },
        citySection: {
            height: '30%',
            width: '100%',
        },
        cityContainer: {
            height: '100%',
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        cityDescription: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 7
        },
        itinerariesContainer: {
            width: width,
            height: "100%",
            paddingHorizontal: 10
        },
        itinerary: {
            width: "100%",
            height: 400,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'rgba(0,0,0,0.7)',
            marginVertical: 10,
            borderRadius: 25,
            // paddingVertical: 15
        },
        userInfo: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 100,
            width: '100%',
        },
        userImage: {
            height: '100%',
            width: '30%',
            borderRadius: 50,
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
        <ScrollView>
            <View style={{ width: width }}>
                <ImageBackground style={styles.itinerariesSection} source={bgCity} resizeMethod='auto' resizeMode="cover" >
                    <Button title="Go back" onPress={() => navigation.goBack()} />
                    {/* <View style={{ height: '20%', width: width }}> */}
                    {city &&
                        <View style={styles.citySection}>
                            <ImageBackground source={{ uri: city.image }} style={styles.cityContainer} resizeMethod='auto' resizeMode="cover" >
                                <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 40 }]}>{city.name}</Text>
                                <View style={styles.cityDescription}>
                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 15, textAlign: 'center' }]}>{city.description}</Text>
                                </View>
                            </ImageBackground>
                        </View>
                    }
                    <View style={{ height: '80%' }}>
                        {itineraries.length > 0 ?
                            <FlatList
                                data={itineraries}
                                style={styles.itinerariesContainer}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.itinerary} >
                                            <View style={{ padding: 10 }}>
                                                <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 40, textAlign: 'center', marginBottom: 10 }]} >{item.title}</Text>
                                                <Text style={[styles.fonts.slogan, styles.text.light, { fontSize: 15, textAlign: 'justify' }]} >{item.description}</Text>
                                            </View>
                                            <View style={styles.userInfo}>
                                                <Image source={{ uri: item.userPhoto }} style={styles.userImage} resizeMethod='auto' resizeMode='cover' />
                                                <View style={{ justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{item.userName}</Text>
                                                    <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Duration: {item.duration}hs</Text>
                                                    <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Price: ${item.price}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity underlayColor="#000" activeOpacity={0.6}>
                                                <View style={styles.cta.container}>
                                                    <Text style={styles.cta.text}>
                                                        More Info
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            /> :
                            <View styles={{ borderWidth: 4, backgroundColor: 'rgba(0,0,0,0.5)', height: height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#00695c" />
                                <Text>Loading Itineraries...</Text>
                            </View>
                        }
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

export default City;