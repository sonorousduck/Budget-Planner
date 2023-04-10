import React from "react";
import { View, Text} from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"

const SettingsPage = () => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, auth } = useFirebase();

    return (
        <SafeAreaView>
            <Text>Settings</Text>
            <Button onPress={() => {firebase.signOut(setSignedIn, auth)}}>
                Sign out
            </Button>
        </SafeAreaView>
    )
}

export default SettingsPage;