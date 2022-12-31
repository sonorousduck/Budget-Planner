import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import TransactionDataTable from "../components/TransactionDataTable";
import ExpenditureGraph from "../components/ExpenditureGraph";
import Transaction from "../components/Transaction";



const HomePage = ({navigation}) => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup, currentTransactions, setCurrentTransactions } = useFirebase();
    const [localCurrentTransactions, setLocalCurrentTransactions] = useState([])

    useEffect(() => {
      if(!currentTransactions)
      {
        console.log("YEEEET:" + currentGroup);
        firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions);
      }
      if (currentTransactions && currentTransactions.length) {
        setLocalCurrentTransactions(currentTransactions);
      }
    }, [currentTransactions])



    return (
        <SafeAreaView style={{flex: 1, height: '100%'}} edges={['left', 'right', 'top']}>
            <View style={styles.graphPortion}>
                {/* <ExpenditureGraph/> */}
            </View>


            <View style={styles.otherPortion}>
             
              <View style={styles.monthIndicator}>
                <Text style={{color: 'white', fontSize: 16}}>December 2022</Text>
              </View>
                <ScrollView style={{height: '100%'}}>
                  {localCurrentTransactions.map((transaction, index) => (
                      <Transaction key={index} props={transaction} email={currentGroup}/>
                  ))}
                </ScrollView>

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
    flex: 6,
    backgroundColor: '#638a7e'
  },
  monthIndicator: {
    backgroundColor: '#23508b',
    width: '50%',
    marginTop: 16,
    marginBottom: 16,
    padding: 16
  },
});

export default HomePage;