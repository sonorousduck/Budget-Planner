import React from "react";
import { View, Text, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import { Button } from "react-native-paper";

const CreateNewBudgetPage = () => {

    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    circleBudget: {
        flex: 1,
    },
    tableBudget: {
        flex: 3
    }
});


export default CreateNewBudgetPage;