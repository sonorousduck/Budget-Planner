import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";
import FAB from "../components/FAB";
import TransactionDataTable from "../components/TransactionDataTable";
import ExpenditureGraph from "../components/ExpenditureGraph";
// import WavyBackground from "react-native-wavy-background"; // Uninstall this
import { LinearGradient } from 'expo-linear-gradient';
import Transaction from "../components/Transaction";



const HomePage = ({navigation}) => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup, currentTransactions, setCurrentTransactions } = useFirebase();
    const [localCurrentTransactions, setLocalCurrentTransactions] = useState([])

    // useEffect(() => {
    //   console.log("[] called")
    //   // console.log(currentTransactions != undefined)
    //   // console.log(currentGroup)
    //   if (!currentTransactions) {
    //     console.log("Running this: ")
    //     console.log(`Email is NOT undefined ${currentGroup.email != undefined}`)
    //     firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions);
    //     console.log(currentTransactions != undefined)
    //   }
    //   if (currentTransactions) {
    //     setLocalCurrentTransactions(currentTransactions);
    //   }
    // }, [])
    


    useEffect(() => {
      console.log(currentTransactions != undefined)
      
      if(!currentTransactions)
      {
        firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions);
      }
      if (currentTransactions) {
        setLocalCurrentTransactions(currentTransactions);
      }
    }, [currentTransactions])


    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            <View style={styles.graphPortion}>
                {/* <ExpenditureGraph/> */}
            </View>


            <View style={styles.otherPortion}>
             
              <View style={styles.monthIndicator}>
                <Text style={{color: 'white', fontSize: 16}}>December 2022</Text>
              </View>
                <ScrollView>
                  {localCurrentTransactions.map((transaction, index) => (
                      <Transaction key={index} props={transaction} email={currentGroup.email}/>
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