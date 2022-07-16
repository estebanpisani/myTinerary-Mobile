import { Form, FormItem, Picker } from 'react-native-form-component';
import { StyleSheet, View, ImageBackground, useWindowDimensions, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import { useSelector, useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions';
import dataActions from '../redux/actions/dataActions';
import bgCity from './../assets/city-body.jpg'

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('');
    const [photo, setPhoto] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let errors = useSelector(store => store.userReducer.errors);
    let message = useSelector(store => store.userReducer.message);

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
        authContainer: {
            flexGrow: 1,
            justifyContent: 'center',
            padding: 30
        },
        formContainer: {
            borderWidth: 1,
            padding: 20,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 12
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
        if (countryList.length < 1) {
            dispatch(dataActions.getCountries());
        }
        // eslint-disable-next-line
    }, []);

    let countriesFetch = useSelector(store => store.dataReducer.countries);
    let countryList = []

    countriesFetch.length > 0 &&
        countriesFetch.map(country => countryList.push({ label: country, value: country }));

    // Sign Up Form
    async function handleSubmit() {
        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            country: country,
            userPhoto: userPhoto.trim(),
            email: email.trim(),
            password: password,
            passwordRepeat: password2,
            method: 'register-form',
            verified: false
        };

        dispatch(userActions.signUp(userData));

    };

    if (message !== '') {
        setTimeout(function () {
            navigation.navigate("Login");
        }, 1000);
    }

    return (
            <ScrollView>
        <ImageBackground style={styles.authContainer} source={bgCity} resizeMethod='auto' resizeMode="cover" >
                <Form
                    onButtonPress={() => handleSubmit()}
                    buttonText='SIGN UP'
                    buttonStyle={{ backgroundColor: '#00695c' }}
                    style={styles.formContainer}
                >
                    <Text style={[styles.text.primary, { textAlign: 'center', fontSize: 25, marginBottom: 30 }]}>Sign Up</Text>

                    <FormItem
                        label="First Name"
                        isRequired
                        value={firstName}
                        onChangeText={(name) => setFirstName(name)}
                        asterik
                        showErrorIcon
                        textContentType='givenName'
                        keyboardType='default'
                        textInputStyle={{ color: '#00695c' }}
                    />
                    <FormItem
                        label="Last Name"
                        isRequired
                        value={lastName}
                        onChangeText={(lastname) => setLaststName(lastname)}
                        asterik
                        showErrorIcon
                        textContentType='familyName'
                        keyboardType='default'
                        textInputStyle={{ color: '#00695c' }}
                    />
                    {countryList.length > 0 &&
                        <Picker
                            items={countryList}
                            label="Country"
                            asterik
                            isRequired
                            selectedValue={country}
                            placeholder='------ Select your country ------'
                            textAlign='center'
                            onSelection={(item) => setCountry(item.value)}
                        />
                    }

                    <FormItem
                        label="Photo URL"
                        value={photo}
                        onChangeText={(photo) => setPhoto(photo)}
                        showErrorIcon
                        textContentType='URL'
                        keyboardType='url'
                        textInputStyle={{ color: '#00695c' }}
                    />
                    <FormItem
                        label="Email"
                        isRequired
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        asterik
                        showErrorIcon
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        textInputStyle={{ color: '#00695c' }}
                    />
                    <FormItem
                        label="Password"
                        isRequired
                        value={password}
                        onChangeText={(pass) => setPassword(pass)}
                        asterik
                        showErrorIcon
                        textContentType='password'
                        secureTextEntry
                    />
                    <FormItem
                        label="Repeat your password"
                        isRequired
                        value={password2}
                        onChangeText={(pass) => setPassword2(pass)}
                        asterik
                        showErrorIcon
                        textContentType='password'
                        secureTextEntry
                    />
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 30 }}>Already registered?</Text>
                        <TouchableOpacity underlayColor="#000" activeOpacity={0.6} onPress={() => navigation.navigate("Login")}>
                            <Text style={[styles.text.primary, { textAlign: 'center', fontSize: 20, marginTop: 15 }]}>Sign In!</Text>
                        </TouchableOpacity>
                    </View>

                </Form>
        </ImageBackground>
            </ScrollView>
    )
}
export default SignUp;