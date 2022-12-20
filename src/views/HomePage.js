import React from "react";
import { View, StyleSheet, Text} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import TransactionDataTable from "../components/TransactionDataTable";
import ExpenditureGraph from "../components/ExpenditureGraph";

const HomePage = () => {
    
    const { firebase, signedIn, setSignedIn } = useFirebase();

    


    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            <View style={styles.graphPortion}>
                <ExpenditureGraph/>
            </View>
            <View style={styles.otherPortion}>
                <TransactionDataTable />
            </View>
            <FAB/>                
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  graphPortion: {
    flex: 3,
    backgroundColor: "#2d2e2e"
  },
  otherPortion: {
    flex: 4,

  }
});

export default HomePage;