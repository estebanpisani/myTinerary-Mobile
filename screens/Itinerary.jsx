import { KeyboardAvoidingView, StyleSheet, View, ImageBackground, useWindowDimensions, ScrollView, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text } from "@react-native-material/core";
import { useDispatch, useSelector } from 'react-redux';

import bgCity from './../assets/city-body.jpg'
import Carousel from 'react-native-snap-carousel';

import AppLoading from 'expo-app-loading';
import { useFonts, Comfortaa_500Medium } from '@expo-google-fonts/comfortaa';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Charm_400Regular } from '@expo-google-fonts/charm';

import activityActions from '../redux/actions/activityActions';
import itineraryActions from '../redux/actions/itineraryActions';

const Itinerary = ({ route }) => {
    const itineraryID = route.params.id;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [activities, setActivities] = useState([]);
    const [change, setChange] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const [editID, setEditID] = useState('');
    const [edit, setEdit] = useState(false);
    let itinerary = useSelector(store => store.itineraryReducer.itinerary);
    const user = useSelector(store => store.userReducer.userData);
    const { height, width } = useWindowDimensions();

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
        activitiesSection: {
            width: width,
            height: height,
            flexGrow: 1,
        },
        itineraryInfo: {
            width: "100%",
            height: height / 4,
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: 'rgba(0,0,0,0.7)',
            paddingHorizontal: 20
        },
        activitiesContainer: {
            minHeight: height / 2,
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginBottom: 7
        },
        activity: {
            borderWidth: 2,
            borderColor: 'white',
            width: '100%',
            minHeight: 230,
            marginVertical: 40,
            justifyContent: 'space-between',
        },
        activityInfo: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            width: '100%',
            textAlign: 'center',
            padding: 5
        },
        commentContainer: {
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
            maxHeight: height / 2,
            width: '85%',
            padding: 10,
            backgroundColor: 'rgba(0, 105, 92,0.8)',
            marginBottom: 15,
            borderRadius: 10

        },
        commentBox: {
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255, 0.2)',
            width: '100%',
            // padding: 5,
            marginBottom: 5,
            borderRadius: 7,
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        comment: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '100%',
            marginVertical: 5
            // height: '30%',
        },
        commentOptions: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            borderBottomEndRadius: 7,
            borderBottomStartRadius: 7,
            paddingVertical: 5,
            backgroundColor: 'rgb(0, 105, 92)'
            // height: '30%',
        },
        commentImage: {
            height: 40,
            width: 40,
            borderRadius: 50,
        },
        inputContainer: {
            // marginTop: 20,
            width: '100%',
            height: 35,
            justifyContent: 'center',
            marginTop: 15
        },
        input: {
            borderWidth: 1,
            backgroundColor: "white",
            width: '100%',
            height: 40,
            padding: 3,
            borderRadius: 5,
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
    }, [change]);

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

    async function handleSubmitComment() {
        if (commentValue !== '') {
            await dispatch(itineraryActions.addComment(itinerary._id, commentValue));
        }
        setCommentValue('');
        setChange(!change);
    }

    const handleEdit = (commentID, comment) => {
        setEdit(true);
        setEditID(commentID);
        setCommentValue(comment)
    }

    const closeEdit = () => {
        setEdit(false);
        setEditID('');
        setCommentValue('');
    }

    async function handleSubmitEdit() {
        setEdit(false)
        if (commentValue !== '') {
            await dispatch(itineraryActions.updateComment(editID, commentValue));
        }
        setCommentValue('');
        setEditID('');
        setChange(!change);
    }

    async function handleDelete(commentID) {
        await dispatch(itineraryActions.deleteComment(commentID))
        setChange(!change);
    }
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ImageBackground style={styles.activitiesSection} source={bgCity} resizeMethod='auto' resizeMode="cover" >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "position"}
                style={{ flex: 1 }}
            >
                <ScrollView >
                    {itinerary &&
                        <View style={{ justifyContent: 'space-around', minHeight: height }}>
                            <View style={styles.itineraryInfo}>
                                <Text style={[styles.fonts.slogan, styles.text.light, styles.text.shadowBlurPrimary, { fontSize: 20, textAlign: 'center' }]} >{itinerary.title}</Text>
                                <Text style={[styles.fonts.normal, styles.text.light, { fontSize: 10, textAlign: 'center' }]} >{itinerary.description}</Text>
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
                                                <Text style={[styles.fonts.snormal, styles.text.light, styles.activityInfo, { fontSize: 10 }]} >{item.description}</Text>
                                            </ImageBackground>
                                        }
                                        sliderWidth={width}
                                        itemWidth={width - 70}
                                    /> :
                                    <Text style={{ color: 'white', fontSize: 40, width: width, textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }}>No available activities</Text>
                                }
                            </View>
                            {activities.length > 0 &&
                                <View style={{ backgroundColor: 'black', width: '85%', alignSelf: 'center', borderRadius: 5, marginBottom: 3, height: 30, justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }} >Leave us a comment!</Text>
                                </View>
                            }

                            {itinerary.comments.length > 0 &&
                                <View style={styles.commentContainer}>
                                    <ScrollView nestedScrollEnabled contentOffset={{ x: 0, y: 3000 }}  >
                                        {itinerary.comments.map((comment, i) => {
                                            return (
                                                <View style={styles.commentBox}>
                                                    <View style={styles.comment}>
                                                        <Image source={{ uri: comment.user.userPhoto }} style={styles.commentImage} resizeMethod='auto' resizeMode='cover' />
                                                        <View style={{ width: '70%', marginStart: 20, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                            <View style={{ width: '30%', alignItems: 'center' }}>
                                                                <Text style={{ fontSize: 12, textAlign: 'center', color: 'rgb(2, 51, 46)' }}>{comment.user.firstName}</Text>
                                                                <Text style={{ fontSize: 12, textAlign: 'center', color: 'rgb(2, 51, 46)' }}>{comment.user.lastName}</Text>
                                                            </View>
                                                            {edit && editID === comment._id ?
                                                                <TextInput
                                                                    style={[styles.input, {
                                                                        width: '60%',
                                                                        height: 30,
                                                                        padding: 1,
                                                                    }]}
                                                                    onChangeText={text => setCommentValue(text)}
                                                                    textAlign='center'
                                                                    keyboardType="default"
                                                                    defaultValue={commentValue}
                                                                    onSubmitEditing={handleSubmitEdit}
                                                                />
                                                                :
                                                                <Text style={{ width: '70%', fontSize: 10, textAlign: 'center', color: 'white', flexGrow: 1 }}>{comment.comment}</Text>
                                                            }
                                                        </View>
                                                    </View>
                                                    {user?.id === comment.user._id &&
                                                        <View style={styles.commentOptions}>
                                                            {edit && editID === comment._id ?
                                                                <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => closeEdit()}>
                                                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', marginHorizontal: 10 }}>CLOSE</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => handleEdit(comment._id, comment.comment)}>
                                                                    <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', marginHorizontal: 10 }}>EDIT</Text>
                                                                </TouchableOpacity>
                                                            }
                                                            <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => handleDelete(comment._id)}>
                                                                <Text style={{ fontSize: 12, textAlign: 'center', color: 'white', marginHorizontal: 10 }}>DELETE</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    }
                                                </View>
                                            )
                                        })}
                                    </ScrollView>

                                    <View style={styles.inputContainer}>
                                        {user && !edit &&
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={text => setCommentValue(text)}
                                                textAlign='center'
                                                placeholder="Tell us what you think about this itinerary!"
                                                keyboardType="default"
                                                defaultValue={commentValue}
                                                onSubmitEditing={handleSubmitComment}
                                            />
                                        }
                                        {
                                            (user === null && edit === false) &&
                                            <Text style={{ color: 'white', justifyContent: 'center', textAlign: 'center', fontSize: 20 }}>Sign in to comment!</Text>
                                        }
                                    </View>
                                </View>
                            }
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
            </KeyboardAvoidingView>
        </ImageBackground >
    );
}

export default Itinerary;