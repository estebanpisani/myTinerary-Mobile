import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, useWindowDimensions, ScrollView, Image } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCity from './../assets/city-body.jpg'

import { useDispatch, useSelector } from 'react-redux';

import cityActions from './../redux/actions/cityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const City = () => {
    const cityID = '62a8e658e9d388724d1b4f79'
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
        cityContainer: {
            height: '100%',
            justifyContent: 'space-evenly',
            width: width,
            alignItems: 'center',
        },
        cityDescription: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: 7
        },
        itinerariesSection: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: width,
            padding: 20
        },
        itinerariesContainer: {
            width: '100%',
            minHeight: "100%",
            justifyContent: 'space-around'
        },
        itinerary: {
            width: "100%",
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.7)',
            marginVertical:10
        },
        userInfo: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 110,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
        userImage: {
            height: '90%',
            width: '30%',
            borderRadius: 50
        }
    });

    useEffect(() => {
        // dispatch(cityActions.getCities());
        dispatch(cityActions.getCityById(cityID));
        dispatch(itineraryActions.getItinerariesByCity(cityID));
        // eslint-disable-next-line
    }, []);
    let city = useSelector(store => store.cityReducer.city);
    let itineraries = useSelector(store => store.itineraryReducer.itineraries);

    return (
        <ScrollView>
            <View style={{ width: width , minHeight: height}}>
                <View style={{ height: '25%', width: width }}>
                    {city &&
                        <ImageBackground source={{ uri: city.image }} style={styles.cityContainer} resizeMethod='auto' resizeMode="cover" >
                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 40 }]}>{city.name}</Text>
                            <View style={styles.cityDescription}>
                                <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 15, textAlign: 'center' }]}>{city.description}</Text>
                            </View>
                        </ImageBackground>
                    }
                </View>
                <ImageBackground style={styles.itinerariesSection} source={bgCity} resizeMethod='auto' resizeMode="cover" >
                    <View style={styles.itinerariesContainer}>
                        {itineraries.length > 0 ?
                            <FlatList
                                data={itineraries}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.itinerary} >
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 40, textAlign: 'center', }]} >{item.title}</Text>
                                            <Text style={[styles.fonts.slogan, styles.text.light, { fontSize: 15, textAlign: 'justify', marginVertical: 10, padding:10 }]} >{item.description}</Text>
                                            <View style={styles.userInfo}>
                                                <Image source={{ uri: item.userPhoto }} style={styles.userImage} resizeMethod='auto' resizeMode='cover' />
                                                <View>
                                                    <Text style={{ fontSize: 20, textAlign: 'center', color:'white'}}>{item.userName}</Text>
                                                    <Text style={{ fontSize: 15, textAlign: 'center',color:'white' }}>Duration: {item.duration}hs</Text>
                                                    <Text style={{ fontSize: 15, textAlign: 'center', color:'white'}}>Price: ${item.price}</Text>  
                                                </View>
                                            </View>
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