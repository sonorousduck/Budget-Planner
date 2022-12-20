import React from "react";
import { View, Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"

const SettingsPage = () => {
    
    const { firebase, signedIn, setSignedIn } = useFirebase();

    return (
        <SafeAreaView>
            <Text>Settings</Text>
        </SafeAreaView>
    )
}

export default SettingsPage;