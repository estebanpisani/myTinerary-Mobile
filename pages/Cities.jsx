import { ActivityIndicator, StyleSheet, View, ImageBackground, FlatList, useWindowDimensions, ScrollView, TextInput, TouchableOpacity  } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCities from './../assets/cities-cards.jpg'

import { useDispatch, useSelector } from 'react-redux';
import cityActions from './../redux/actions/cityActions';

const Cities = ({ navigation }) => {
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
        filterContainer: {
            flexDirection: 'row',
            height: '12%',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            backgroundColor: "#00695c",

        },
        input: {
            borderWidth: 1,
            backgroundColor: "white",
            width: '60%',
            height: 40,
            padding: 10
        },
        heroContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: height,
            width: width,
            flex: 1
        },
        citiesContainer: {
            width: width,
            height: '100%',
            paddingHorizontal: 40
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

    return (
        <ScrollView>
            <View style={{ width: width }}>
                <ImageBackground style={styles.heroContainer} source={bgCities} resizeMethod='auto' resizeMode="cover" >
                    <View style={styles.filterContainer}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearch}
                            placeholder="Try searching 'Bariloche'"
                            keyboardType="default"
                        />
                        {/* <Text style={{marginLeft:10}}>🔎</Text> */}
                    </View>
                    <View style={{ height: '85%' }}>
                        {cities.length > 0 ?
                            <FlatList
                                style={styles.citiesContainer}
                                data={results}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={navigation.navigate('City',{id:item._id})}>
                                            <ImageBackground source={{ uri: item.image }} style={styles.cityContainer}>
                                                <View style={styles.city} >
                                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { textAlign: 'center', fontSize: 40 }]} >{item.name}</Text>
                                                    <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { textAlign: 'center', fontSize: 30 }]}>{item.country}</Text>
                                                </View>
                                            </ImageBackground>
                                        </TouchableOpacity>
                                    )
                                }}
                            /> :
                            <View styles={{ borderWidth: 4, backgroundColor: 'rgba(0,0,0,0.5)', height: height, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#00695c" />
                                <Text>Loading Cities...</Text>
                            </View>
                        }
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    );
}

export default Cities;