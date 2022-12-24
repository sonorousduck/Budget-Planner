import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Alert} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"


const TransactionPage = ({route, navigation}) => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();
    const props = route.params.props.props;
    const email = route.params.props.email;

    const [isEditable, setIsEditable] = useState(false);
    const [description, setDescription] = useState(props.description);
    const [dateTime, setDateTime] = useState(new Date(props.date).toDateString())
    const [category, setCategory] = useState(props.category)
    const [optionalDetails, setOptionalDetails] = useState(props.optionalDetails)
    const [expense, setExpense] = useState(props.expense); // This needs a radio button to appear to select

    const costRef = useRef(null);


    let color = "green";
    let negative = "+";
    if (props.expense)
    {
        color = "red";
        negative = "-";
    }

    const showConfirmDialog = () => {
      return Alert.alert(
        "Are you sure?",
        "Are you sure you want to delete this transaction?",
        [
          {
            text: "Yes",
            onPress: () => {
              firebase.deleteTransaction(email, props.date, props.uuid);
              navigation.goBack();
            },
          },
          {
            text: "No",
          },
        ]
      )
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
                <TouchableOpacity onPress={() => {console.log("Description Pressed")}}>
                  <TextInput style={[styles.title, styles.editable]} editable={isEditable} value={description}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {console.log("dateTime Pressed")}}>
                  <TextInput style={[styles.date, styles.editable]} editable={isEditable} value={dateTime}/>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log("cost Pressed")
                    setIsEditable(true);
                    costRef.current?.focus();
                  }}>
                  <TextInput style={[styles.cost, {color: color}, styles.editable]} editable={isEditable} value={negative + '$' + props.amount} ref={costRef}></TextInput>

                </TouchableOpacity>

                {props.optionalDetails != "" ? (
                  <TouchableOpacity onPress={() => {
                    console.log("optional details Pressed")
                    setIsEditable(true);
                    }}>
                    <TextInput style={[styles.additionalDetails, styles.editable]} editable={isEditable} value={props.optionalDetails}/>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
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
                      showConfirmDialog();
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
    // alignSelf: 'center',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold'
  },

  date: {
    // alignSelf: 'center',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16
  },
  cost: {
    // alignSelf: 'center',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 8
  },
  additionalDetails: {

  },
  category: {

  },
  editable: {

  },

});

// LOG  {"props": 
// {"props": 
// {"amount": 1.03, "date": 1671840074787, "description": "Newest", "expense": true, "optionalDetails": "", "timestamp": 1671840074788, "uuid": "e11d2e73-e972-4205-ab21-30254b590365"}}}

export default TransactionPage;