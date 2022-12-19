import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, useWindowDimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { useState } from 'react';
import { Button, TextInput } from  "react-native-paper"; 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    const imageWidth = width / 2 + width / 16;
    const imageHeight = height / 4;
    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.centered} onPress={() => console.log("Safe Area Pressed")}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[styles.container]}
                    onPress={() => Keyboard.dismiss()}
                >
                    <Image style={{width: imageWidth, height: imageHeight, alignSelf: 'center', padding: 2}} source={require('../images/pngwing.com.png')} />
                    <Text style={styles.title}>Sign in to your account</Text>
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder={"Email"}
                        style={styles.input}
                        left={<TextInput.Icon icon="email" style={{alignSelf: 'center', paddingTop: 20}} />}
                    />
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholder={"Password"}
                        style={[styles.input, {textAlignVertical: 'center'}]}
                        secureTextEntry={true}
                        left={<TextInput.Icon style={{alignSelf: 'center', paddingTop: 20}} icon="lock" />}

                    />
                    <Button style={{marginBottom: 16, alignSelf: 'flex-end'}} mode='text' onPress={() => {
                        console.log("Don't forget your password then")
                        Keyboard.dismiss();
                        }}>
                        Forgot your password?
                    </Button>
                    <View style={[styles.container, {alignSelf: 'center', width: '100%'}]}>
                        <Button mode="contained" onPress={() => {
                            Keyboard.dismiss();
                            firebase.signIn(email, password);
                            
                            }}>
                            Login
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            <View>
                <View style={[styles.horizontalLayout, {alignItems: 'center'}]}>
                    <Text style={{alignItems: 'center'}}>Don't have an account?</Text>
                    <Button labelStyle={{fontWeight: 'bold'}} mode='text' onPress={() => {
                        console.log("Navigating to Create Account Page");
                        navigation.navigate('CreateAccount')

                    }}>
                        Sign Up
                    </Button>
                </View>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
        // backgroundColor: 'black'
    },
    title: {
        fontSize: 18,
        marginVertical: 8,
        marginTop: 32,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    input: {
        padding: 16,
        paddingBottom: 4,
        marginTop: 4,
        marginBottom: 4,        
        backgroundColor: 'transparent'
  },
  horizontalLayout: {
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    width: '80%'
  },

    
})


export default LoginPage;