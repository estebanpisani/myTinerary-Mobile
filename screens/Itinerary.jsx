import { StyleSheet, View, ImageBackground, useWindowDimensions, ScrollView, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text } from "@react-native-material/core";

import bgCity from './../assets/city-body.jpg'
import Carousel from 'react-native-snap-carousel';

import { useDispatch, useSelector } from 'react-redux';

import activityActions from '../redux/actions/activityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const Itinerary = ({ route }) => {
    const itineraryID = route.params.id;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [activities, setActivities] = useState([]);
    // const [change, setChange] = useState(false);
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
        activitiesSection: {
            width: width,
            height: height,
            flexGrow: 1,
        },
        itineraryInfo: {
            width: "100%",
            height: height / 5,
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingHorizontal: 20
        },
        activitiesContainer: {
            minHeight: height / 2,
            flexGrow: 1,
            padding: 20,
            // paddingBottom: 55
            alignItems: 'center',
            justifyContent: 'space-evenly',

        },
        activity: {
            borderWidth: 2,
            borderColor: 'white',
            width: '100%',
            minHeight: 230,
            marginVertical: 10,
            justifyContent: 'space-between',
        },
        activityInfo: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100%',
            textAlign: 'center',
            padding: 5
        },
        userInfo: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: height / 6,
            width: '100%',
            padding: 10,
            backgroundColor: '#000',
            marginBottom: 45
        },
        userImage: {
            height: '95%',
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
            },
            text: {
                textTransform: "uppercase",
                color: 'white'
            }
        },
    });

    useEffect(() => {
        dispatch(itineraryActions.getItineraryById(itineraryID));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const response = async () => {
            const activitiesResponse = await dispatch(activityActions.getActivitiesByItinerary(itineraryID));
            setActivities(activitiesResponse);
        }
        if (activities.length < 1) {
            response();
        }
        // eslint-disable-next-line
    }, []);

    let itinerary = useSelector(store => store.itineraryReducer.itinerary);

    return (
        <ImageBackground style={styles.activitiesSection} source={bgCity} resizeMethod='auto' resizeMode="cover" >
            <ScrollView >
                {itinerary &&
                    <View style={{ justifyContent: 'space-between', minHeight: height }}>
                        <View style={styles.itineraryInfo}>
                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 20, textAlign: 'center' }]} >{itinerary.title}</Text>
                            <Text style={[styles.fonts.slogan, styles.text.light, { fontSize: 10, textAlign: 'center' }]} >{itinerary.description}</Text>
                            <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => navigation.navigate("City", { id: itinerary.country })}>
                                <View style={styles.btnBack.container}>
                                    <Text style={styles.btnBack.text}>
                                        Back
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.activitiesContainer}>
                            {activities.length > 0 ?
                                <Carousel
                                    enableMomentum={false}
                                    inactiveSlideOpacity={0.5}
                                    data={activities}
                                    renderItem={({ item }) =>
                                        <ImageBackground style={styles.activity} source={{ uri: item.picture }} resizeMethod='auto' resizeMode="cover" >
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 20 }, styles.activityInfo]} >{item.title}</Text>
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.activityInfo, { fontSize: 10 }]} >{item.description}</Text>
                                        </ImageBackground>
                                    }
                                    sliderWidth={width}
                                    itemWidth={width - 70}
                                /> :
                                <Text style={{ color: 'white', fontSize: 40, width:width, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.7)'}}>No available activities</Text>
                            }
                        </View>
                        <View style={styles.userInfo}>
                            <Image source={{ uri: itinerary.userPhoto }} style={styles.userImage} resizeMethod='auto' resizeMode='cover' />
                            <View style={{ height: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{itinerary.userName}</Text>
                                <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Duration: {itinerary.duration}hs</Text>
                                <Text style={{ fontSize: 15, textAlign: 'center', color: 'white' }}>Price: ${itinerary.price}</Text>
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
        </ImageBackground>
    );
}

export default Itinerary;