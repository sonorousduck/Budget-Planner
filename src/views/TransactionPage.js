import React from "react";
import { View, Text, StyleSheet} from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"


const TransactionPage = ({route, navigation}) => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();
    const props = route.params.props.props;
    const dateTime = new Date(props.date).toDateString()
    let color = "green";
    let negative = "+";
    if (props.expense)
    {
        color = "red";
        negative = "-";
    }

    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
          <View style={styles.graphPortion}>
            <View style={{elevation: 1, backgroundColor: 'lightgrey', width: '97%', alignSelf: 'center', height: '100%', borderRadius: 8}}>
              <View style={{flexDirection: 'row'}}>
                <Button 
                    style={{height: '50%', marginTop: 16}} 
                    labelStyle={{color: '#8b8b8b', fontSize: 32}} 
                    icon="chevron-left" 
                    mode='text'
                    onPress={() => {
                      navigation.goBack();
                    }}
                    />
                </View>
              </View>
            </View> 

          <View style={styles.otherPortion}>
            <View style={styles.informationCard}>
              <View style={{flex: 6}}>
                
                <Text style={styles.title}>{props.description}</Text>
                <Text style={styles.date}>{dateTime}</Text>
                <Text style={[styles.cost, {color: color}]}>{negative}${props.amount}</Text>
                {props.optionalDetails != "" ? (
                  <Text style={styles.additionalDetails}>{props.optionalDetails}</Text>
                ) : (
                  <></>
                )}
                <Text style={styles.additionalDetails}>{props.optionalDetails}</Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <View style={{flex: 4}}/>
                  <Button
                    mode='text'
                    icon="delete"
                    style={{ alignItems: 'center', marginBottom: 16}}
                    labelStyle={{color: '#ad4947', fontSize: 32, alignItems: 'center'}}
                    contentStyle={{alignContent: 'center'}}
                    onPress = {() => {
                      console.log("Pop up delete confirmation window");
                    }}
                    />

              </View>
              
                {/* <Button
                  mode="contained"
                  style={{width:'100%', marginRight: 4, backgroundColor: 'rgb(217, 78, 77)'}}
                  contentStyle={{width: '65%', alignSelf: 'center'}}
                  compact={false}
                >
                  Delete
                </Button>
                <Button
                  mode="outlined"
                  style={{marginLeft: 4}}
                  contentStyle={{width: '65%', alignSelf: 'center'}}

                  
                  >
                  Edit
                </Button> */}
              </View>
            </View>
            {/* <View style={styles.monthIndicator}>
              <Text style={{color: 'white', fontSize: 16}}>December 2022</Text>
            </View> */}
              
          {/* </View> */}
            
          
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  graphPortion: {
    flex: 3,
    // backgroundColor: "#2d2e2e"
  },
  otherPortion: {
    flex: 6,
    // backgroundColor: '#638a7e'
  },
  monthIndicator: {
    backgroundColor: '#23508b',
    width: '50%',
    marginTop: 16,
    marginBottom: 16,
    padding: 16
  },
  informationCard: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(99, 138, 126, 0.7)',
    height: '95%',
    marginTop: 8,
    borderRadius: 10,
  },
  title: {
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold'
  },

  date: {
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 16
  },
  cost: {
    alignSelf: 'center',
    fontSize: 24,
    marginTop: 8
  },
  additionalDetails: {

  },
  category: {

  },

});

// LOG  {"props": 
// {"props": 
// {"amount": 1.03, "date": 1671840074787, "description": "Newest", "expense": true, "optionalDetails": "", "timestamp": 1671840074788, "uuid": "e11d2e73-e972-4205-ab21-30254b590365"}}}

export default TransactionPage;