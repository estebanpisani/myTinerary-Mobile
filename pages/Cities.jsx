import { StyleSheet, View, ImageBackground, FlatList, useWindowDimensions, ScrollView } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCities from './../assets/cities-cards.jpg'

import { useDispatch, useSelector } from 'react-redux';
import cityActions from './../redux/actions/cityActions';

const Cities = () => {
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
        filterContainer: {
            height: '15%',
            justifyContent: 'space-around',
            width: '100%',
            alignItems: 'center',
            backgroundColor: "#00695c",
            
        },
        heroContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: height,
            width: width,
            flex: 1
        },
        countriesContainer: {
            display: 'flex',
            width: width,
            height: '100%',
            paddingHorizontal: 40
        },
        countryContainer: {
            width: "100%",
            height: 150,
            marginVertical: 20
        },
        country: {
            width: "100%",
            height: '100%',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'rgba(0,0,0,0.09)'
        }
    });

    const dispatch = useDispatch();

    function handleSearch(event) {
        setSearch(event.target.value);
    }
    useEffect(() => {
        dispatch(cityActions.getCities());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        dispatch(cityActions.filterCities(search));
        // eslint-disable-next-line
    }, [search]);

    let cities = useSelector(store => store.cityReducer.cities);
    // let results = useSelector(store => store.cityReducer.filteredCities);


    return (
        <ScrollView>
            <View style={{ width: width }}>
                <ImageBackground style={styles.heroContainer} source={bgCities} resizeMethod='auto' resizeMode="cover" >

                    <View style={styles.filterContainer}>
                        <Text>Find Cities</Text>
                    </View>


                    <View style={{ height: '80%' }}>
                        <FlatList
                            style={styles.countriesContainer}
                            data={cities}
                            renderItem={({ item }) => {
                                return (
                                    <ImageBackground source={{ uri: item.image }} style={styles.countryContainer}>
                                        <View style={styles.country} >
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 40 }]} >{item.name}</Text>
                                            <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, styles.text.center, { fontSize: 30 }]}>{item.country}</Text>
                                        </View>
                                    </ImageBackground>
                                )
                            }}
                        />
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

export default Cities;