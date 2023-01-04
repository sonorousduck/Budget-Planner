import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import { Button } from "react-native-paper";

const BudgetPage = () => {

    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();

    return (
        <SafeAreaView style={{ flex: 1, height: '100%' }} edges={['left', 'right', 'top']}>
            <View style={styles.graphPortion}>
                {/* This is where the circle budget will go. Maybe a bar instead if the circle proves too difficult */}
                {/* <ExpenditureGraph/> */}
            </View>


            <View style={styles.otherPortion}>
                <ScrollView style={{ height: '100%' }}>


                </ScrollView>

            </View>

            <FAB />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    circleBudget: {
        flex: 1,
    },
    tableBudget: {
        flex: 3
    },
    graphPortion: {
        flex: 3,
        backgroundColor: 'lightgrey'
        // backgroundColor: "#2d2e2e"
    },
    otherPortion: {
        flex: 6,
        // backgroundColor: '#638a7e'
    },
});


export default BudgetPage;