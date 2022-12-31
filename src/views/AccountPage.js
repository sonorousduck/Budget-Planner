import React from "react";
import { View, Text, ScrollView, } from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"

const AccountPage = () => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();

    return (
        <SafeAreaView>
          <ScrollView>
            <View>

            </View>
          </ScrollView>
            {/* <Text>Settings</Text>
            <Button onPress={() => {firebase.signOut(setSignedIn)}}>
                Sign out
            </Button> */}
        </SafeAreaView>
    )
}

export default AccountPage;