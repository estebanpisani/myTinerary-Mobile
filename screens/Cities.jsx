import { ActivityIndicator, StyleSheet, View, ImageBackground, useWindowDimensions, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import bgCities from './../assets/cities-cards.jpg'
import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_500Medium } from '@expo-google-fonts/comfortaa';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Charm_400Regular } from '@expo-google-fonts/charm';
import { useDispatch, useSelector } from 'react-redux';
import cityActions from '../redux/actions/cityActions';

const Cities = () => {
    const dispatch = useDispatch();
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
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
        CitiesSection: {
            width: width,
            height: height,
            flexGrow: 1
        },
        filterContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#00695c",
            height: height / 8,
            width: width,
        },
        input: {
            borderWidth: 1,
            backgroundColor: "white",
            width: '60%',
            height: 40,
            padding: 10
        },
        citiesContainer: {
            paddingHorizontal: 40,
            paddingBottom: 50,
            minHeight: height / 2,
            padding: 10
        },
        cityContainer: {
            width: "100%",
            height: 150,
            marginVertical: 15
        },
        city: {
            width: "100%",
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'rgba(0,0,0,0.09)'
        }
    });

    useEffect(() => {
        dispatch(cityActions.getCities());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        dispatch(cityActions.filterCities(search));
        // eslint-disable-next-line
    }, [search]);
    let cities = useSelector(store => store.cityReducer.cities);
    let results = useSelector(store => store.cityReducer.filteredCities);
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ImageBackground style={styles.CitiesSection} source={bgCities} resizeMethod='auto' resizeMode="cover" >
            <View style={styles.filterContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setSearch}
                    placeholder="Try searching 'Bariloche'"
                    keyboardType="default"
                />
                {/* <Text style={{marginLeft:10}}>🔎</Text> */}
            </View>
            <ScrollView >
                {cities.length > 0 ?
                    <View style={styles.citiesContainer}>
                        {results.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} underlayColor="#000" activeOpacity={0.6} onPress={() => navigation.navigate("City", { id: item._id })} >
                                    <ImageBackground source={{ uri: item.image }} style={styles.cityContainer}>
                                        <View style={styles.city} >
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { textAlign: 'center', fontSize: 40 }]} >{item.name}</Text>
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { textAlign: 'center', fontSize: 30 }]}>{item.country}</Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    :
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: height * 7 / 8, width: width, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={{ color: 'white', fontSize: 40 }}>Loading Cities...</Text>
                    </View>
                }
            </ScrollView>
        </ImageBackground >
    );
}

export default Cities;