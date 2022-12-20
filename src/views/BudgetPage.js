import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import { Button } from "react-native-paper";

const BudgetPage = () => {
    
    const { firebase, signedIn, setSignedIn } = useFirebase();
    
    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            <View style={styles.circleBudget}>
                <Text>Hello There!</Text>

            </View>
            <Button onPress={firebase.readName}>
                Get Name
            </Button>

            <Button onPress={() => {
                
                amount = 1.03;
                date = new Date();
                expense = true;
                description = "Test description"
                firebase.addTransaction(amount, description, expense, date);
            
                }}>
                Add transaction
            </Button>

            <View style={styles.tableBudget}>
                <Text> General Kenobi </Text>
            </View>

            <FAB/>
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
  

export default BudgetPage;