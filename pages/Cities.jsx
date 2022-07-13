import { StyleSheet, View, ImageBackground, FlatList, Image } from "react-native";
import { useState, useEffect } from 'react';
import { Text } from "@react-native-material/core";
import bgCities from './../assets/cities-cards.jpg'

import { useDispatch, useSelector } from 'react-redux';
import cityActions from './../redux/actions/cityActions';

const Cities = () => {

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
        heroContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flex: 1
        },
        countryContainer: {
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '70%',
            height: 200,
            borderWidth: 1,
            marginVertical: 4
        }
    });

    const [search, setSearch] = useState('');

    const dispatch = useDispatch();

    function handleSearch(event) {
        setSearch(event.target.value);
    }
    useEffect(() => {
        dispatch(cityActions.getCities());
        // eslint-disable-next-line
    }, []);

    let cities = useSelector(store => store.cityReducer.cities);

    useEffect(() => {
        dispatch(cityActions.filterCities(search));
        // eslint-disable-next-line
    }, [search]);

    return (
        <ImageBackground style={styles.heroContainer} source={bgCities} resizeMethod='auto' resizeMode="cover" >
            {cities.lenght>0 &&
                <FlatList
                    data={cities}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: '80%' }}>
                                <View style={{
                                    borderRadius: 34, backgroundColor: '#fff',
                                    alignItems: 'center'
                                }}>
                                    <Image source={{ uri: item.image }} style={{ width: 100, height: 300 }} />
                                    <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            }
        </ImageBackground>
    );
}

export default Cities;