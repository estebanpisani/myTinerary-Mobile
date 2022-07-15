import { StyleSheet, View, ImageBackground, useWindowDimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text } from "@react-native-material/core";
import bgCity from './../assets/city-body.jpg'

import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import cityActions from '../redux/actions/cityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const City = ({ route }) => {
    const cityID = route.params.id;
    const dispatch = useDispatch();
    const navigation = useNavigation();
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
            height: height,
            flexGrow: 1
        },
        cityContainer: {
            height: height / 4,
            width: width,
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        itinerariesContainer: {
            minHeight: height / 2,
            padding: 10,
            paddingBottom: 55
        },
        itinerary: {
            width: "100%",
            height: 250,
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
            height: '80%',
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
        btnBack: {
            container: {
                paddingHorizontal: 20,
                borderWidth: 3,
                borderColor: 'white',
                backgroundColor: '#00695c',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
            },
            text: {
                textTransform: "uppercase",
                color: 'white'
            }
        },
        btnMoreInfo: {
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
                marginTop: 10
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
        <ImageBackground style={styles.itinerariesSection} source={bgCity} resizeMethod='auto' resizeMode="cover" >
            <ScrollView >
                {city &&
                    <ImageBackground source={{ uri: city.image }} style={styles.cityContainer} resizeMethod='auto' resizeMode="cover" >
                        <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 40 }]}>{city.name}</Text>
                        <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => navigation.navigate("Cities")}>
                            <View style={styles.btnBack.container}>
                                <Text style={styles.btnBack.text}>
                                    Back
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                }
                {itineraries.length > 0 ?
                    <View style={styles.itinerariesContainer}>
                        {itineraries?.map((itinerary, i) => {
                            return (
                                <View style={styles.itinerary} key={i} >
                                    <View style={{ height: '20%', justifyContent: 'center', paddingHorizontal: 40 }} >
                                        <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 20, textAlign: 'center', marginBottom: 10 }]} >{itinerary.title}</Text>
                                    </View>
                                    <View style={styles.userInfo}>
                                        <Image source={{ uri: itinerary.userPhoto }} style={styles.userImage} resizeMethod='auto' resizeMode='cover' />
                                        <View style={{ height: '100%', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{itinerary.userName}</Text>
                                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Duration: {itinerary.duration}hs</Text>
                                            <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Price: ${itinerary.price}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <TouchableOpacity underlayColor="#000" activeOpacity={0.6}>
                                                    <MaterialCommunityIcons name="cards-heart" size={24} color="white" />
                                                    <MaterialCommunityIcons name="cards-heart-outline" size={24} color="white" />
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>{itinerary.likes.length}</Text>
                                            </View>

                                            <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => navigation.navigate("Itinerary", { id: itinerary._id, city: itinerary.city })}>
                                                <View style={styles.btnMoreInfo.container}>
                                                    <Text style={styles.btnMoreInfo.text}>
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
                    :
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: height * 3 / 4, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 40, textAlign: 'center' }}>No available itineraries</Text>
                    </View>

                }
            </ScrollView>
        </ImageBackground>
    );
}

export default City;