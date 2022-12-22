import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, useWindowDimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { useState } from 'react';
import { Button, TextInput, HelperText } from  "react-native-paper"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    const imageWidth = width / 2;
    const imageHeight = height / 4;
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const auth = getAuth();

    const hasEmailErrors = () => {
        return !email.includes('@') && email != '';
      };
    
    const passwordError = () => {
        return password != confirmPassword;
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.centered} onPress={() => console.log("Safe Area Pressed")}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={[styles.container]}
                    onPress={() => Keyboard.dismiss()}
                >
                    <Image style={{flex: 1, width: imageWidth, height: imageHeight, alignSelf: 'center'}} source={require('../images/pngwing.com.png')} />
                    <Text style={styles.title}>Create Account</Text>
                    <TextInput
                        value={name}
                        onChangeText={(name) => setName(name)}
                        placeholder={"Name"}
                        style={styles.input}
                        left={<TextInput.Icon icon="account" style={{alignSelf: 'center', paddingTop: 4}} />}
                    />
                    <TextInput
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder={"Email"}
                        style={[styles.input, {marginBottom: 1, paddingBottom: 1}]}
                        visible={hasEmailErrors()}
                        left={<TextInput.Icon icon="email" style={{alignSelf: 'center', paddingTop: 4}} />}
                    />
                    <HelperText type="error" visible={hasEmailErrors()} padding="none" >
                        Email Address is invalid!
                    </HelperText>
                    <TextInput
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        placeholder={"Password"}
                        style={[styles.input, {textAlignVertical: 'center'}]}
                        secureTextEntry={true}
                        left={<TextInput.Icon style={{alignSelf: 'center', paddingTop: 4}} icon="lock" />}

                    />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={(password) => setConfirmPassword(password)}
                        placeholder={"Confirm Password"}
                        style={[styles.input, {textAlignVertical: 'center'}]}
                        secureTextEntry={true}
                        left={<TextInput.Icon style={{alignSelf: 'center', paddingTop: 4}} icon="lock" />}
                    />
                    <HelperText type="error" visible={passwordError()} padding="none" >
                        Passwords do not match!
                    </HelperText>

                    <View style={[styles.container, {alignSelf: 'center', width: '100%', paddingTop: 16}]}>
                        <Button mode="contained" onPress={() => {
                            Keyboard.dismiss();
                            if (password != confirmPassword) {
                                console.log("Passwords do not match (TODO: Let the user know this)")
                            }
                            else {
                                firebase.createUser(name, email, password)
                            }
                            }}>
                            Create Account
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            <View>
                <View style={[styles.horizontalLayout, {alignItems: 'center'}]}>
                    <Text style={{alignItems: 'center'}}>Already have an account?</Text>
                    <Button labelStyle={{fontWeight: 'bold'}} mode='text' onPress={() => {
                        console.log("Navigating to Create Account Page");
                        navigation.navigate('Login')
                    }}>
                        Sign In
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
    },
    title: {
        fontSize: 18,
        marginVertical: 8,
        marginTop: 32,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    input: {
        padding: 4,
        marginTop: 2,
        marginBottom: 2,        
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


export default CreateAccountPage;