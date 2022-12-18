import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { useState } from 'react';
import { Button, TextInput } from "react-native-paper";

const LoginPage = () => {
    
    const firebase = useFirebase();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView style={styles.centered}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <Text style={styles.title}>Sign in to your account</Text>
                <TextInput
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    placeholder={"Username"}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder={"Password"}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <Button mode='text' onPress={() => console.log("Don't forget your password then")}>
                    Forgot your password?
                </Button>
                <View style={styles.horizontalLayout}>
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Create Account
                </Button>
                <Button mode="contained" onPress={() => console.log('Pressed')}>
                    Login
                </Button>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
  },
  horizontalLayout: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1
  },
    
})


export default LoginPage;