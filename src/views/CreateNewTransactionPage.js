import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"

const CreateNewTransactionPage = () => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();
    
    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

});
  

export default CreateNewTransactionPage;