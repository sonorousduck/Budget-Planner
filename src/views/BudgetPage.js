import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";

const BudgetPage = () => {
    
    const firebase = useFirebase();

    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            <View style={styles.circleBudget}>
                <Text>Hello There!</Text>

            </View>

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