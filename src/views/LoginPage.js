import React from "react";
import { View, Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"

const LoginPage = () => {
    
    const firebase = useFirebase();

    return (
        <SafeAreaView>
            <Text>Login Page</Text>
        </SafeAreaView>
    )
}

export default LoginPage;