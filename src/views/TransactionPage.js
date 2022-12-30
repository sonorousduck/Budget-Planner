import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Alert, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Modal, Pressable } from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import CalendarPicker from 'react-native-calendar-picker';
import { FontAwesome, Entypo } from '@expo/vector-icons';
// import DropDownPicker from 'react-native-dropdown-picker'; Todo: Uninstall this if I don't use it for categories
import { useIsFocused } from "@react-navigation/native";



const TransactionPage = ({ route, navigation }) => {

  const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();
  const props = route.params.props.props;
  const email = route.params.props.email;
  const [description, setDescription] = useState(props.description);
  const [dateTime, setDateTime] = useState(new Date(props.date))
  const [dateTimePretty, setDateTimePretty] = useState(new Date(props.date).toDateString())
  const [amount, setAmount] = useState(props.amount)
  const [category, setCategory] = useState(props.category)
  const [optionalDetails, setOptionalDetails] = useState(props.optionalDetails)
  const [expense, setExpense] = useState(props.expense);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [calendarSelected, setCalendarSelected] = useState(null);
  const [showPlus, setShowPlus] = useState(true);
  const [negative, setNegative] = useState(props.expense ? "-" : "+");
  const [color, setColor] = useState(props.expense ? "red" : "green");
  const isVisible = useIsFocused();
  const [changed, setChanged] = useState(false);
  const todayDate = new Date();
  const minDate = new Date(new Date().setFullYear(todayDate.getFullYear() - 3))
  const maxDate = new Date(new Date().setFullYear(todayDate.getFullYear() + 3))
  const isFirstRender = useRef(true);

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
  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      console.log('Removing')
     
    })
  })

  // const updateFirebase = () => {
  //   console.log(expense)
  //   firebase.updateTransaction(email, description, expense, amount, dateTime, optionalDetails, props.uuid);
  // }

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {});
  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (changed) {
      console.log("called when screen close"); 
      firebase.updateTransaction(email, description, expense, amount, dateTime, optionalDetails, props.uuid);
    }
    

}, [isVisible]);
    

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    if (!changed) {
      console.log("Something was updated!")
      setChanged(true);
    }
  }, [description, amount, dateTime, optionalDetails, category])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const newNegative = expense ? "-" : "+";
    const newColor = expense ? "red" : "green";
    setNegative(newNegative);
    setColor(newColor);
    setChanged(true);

    console.log(`Expense After: ${expense}`)

  }, [expense])

  const goBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        setShowPlus(true);
      }}>
        <View style={{ elevation: 1, backgroundColor: 'lightgrey', width: '97%', alignSelf: 'center', height: '100%', borderRadius: 8, justifyContent: 'flex-end'}}>
          <Modal
            transparent={true}
            visible={dateModalVisible}
            animationType="slide"
            onRequestClose={() => {
              setDateModalVisible(!dateModalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 2 }}>
                    <Button
                      mode="text"
                      labelStyle={{ color: 'grey' }}
                      onPress={() => {
                        setDateModalVisible(!dateModalVisible);
                      }}
                    >
                      Cancel
                    </Button>
                  </View>
                  <View style={{ flex: 3 }} />
                  <View style={{ flex: 2 }}>
                    <Button
                      mode="text"
                      labelStyle={{ color: '#3366CC' }}
                      onPress={() => {
                        if (calendarSelected) {
                          let newDateTime = new Date(calendarSelected)
                          setDateTime(newDateTime);
                          setDateTimePretty(newDateTime.toDateString())
                        }
                        setDateModalVisible(!dateModalVisible);
                      }}
                    >
                      Done
                    </Button>
                  </View>
                </View>
                <CalendarPicker
                  minDate={minDate}
                  maxDate={maxDate}
                  restrictMonthNavigation={true}
                  onDateChange={(date) => {
                    setCalendarSelected(date)
                  }}
                  initialDate={dateTime}
                />

              </View>

            </View>
          </Modal>

          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Button
              style={{ marginTop: 16 }}
              labelStyle={{ color: '#8b8b8b', fontSize: 32 }}
              icon="chevron-left"
              mode='text'
              onPress={() => {
                goBack();
              }}
            ><Text style={{ fontSize: 16 }}>Back</Text></Button>
            <View style={{ flex: 4 }} />
            <Button
              mode='text'
              icon="delete"
              style={{ alignItems: 'center', marginTop: 18 }}
              labelStyle={{ color: '#71797E', fontSize: 32, alignItems: 'center' }}
              contentStyle={{ alignContent: 'center' }}
              onPress={() => {
                showConfirmDialog();
              }}
            />
          </View>

          <View style={{ flex: 8 }}>
            <TextInput multiline={true} style={[styles.title, styles.editable]} value={description} onChangeText={description => setDescription(description)} />

            <TouchableOpacity onPress={() => {
              setDateModalVisible(true);
            }}>
              <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <FontAwesome name="calendar-o" size={20} style={{ marginLeft: 16, marginRight: 16 }} />
                <Text style={{ textAlignVertical: 'center', fontSize: 16 }}>{dateTimePretty}</Text>
              </View>
            </TouchableOpacity>

            <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Amount</Text>
            <View style={{flexDirection: 'row', marginTop: 16, marginLeft: 16, backgroundColor: '#c0c0c0', borderRadius: 4, marginRight: 16}}>
            <Button 
              mode="text"
              style={{marginTop: 4}}
              labelStyle={{color: color, fontSize: 16, lineHeight: 18}}
              onPress={() => {
                console.log(`Expense Before: ${expense}`)
                setExpense(!expense);
              }}
              >
                {negative}
            </Button>
            <View style={{width: 1, backgroundColor: '#909090', marginRight: 8, alignItems: 'center'}}/>
            <Text style={{fontSize: 16, color: color, justifyContent: 'center', alignContent: 'center', lineHeight: 42, marginRight: 2}}>
              $
            </Text>
            <TextInput
              style={[styles.input, {color: color}]}
              multiline={true}
              value={"" + amount}
              onChangeText={
                (amount) => setAmount(amount)
              }
              keyboardType="numeric"
              ></TextInput>
            </View> 


            <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Optional Details</Text>
            {optionalDetails != "" ?
              (
                <View style={{flexDirection: 'row', marginTop: 16, marginLeft: 16}}>

                <TextInput
                  multiline={true}
                  value={optionalDetails}
                  onChangeText={
                    optionalDetails => setOptionalDetails(optionalDetails)
                  }
                />
                </View>
              )
              :
              (
                <View style={{flexDirection: 'row', marginTop: 16, marginLeft: 16}}>
                  {showPlus ? (
                    <Entypo name="plus" size={20} hidden={true} />
                  ) : <></>
                  }

                  <TextInput
                    style={{marginLeft: 8}}
                    placeholder="Optional Details"
                    onFocus={() => {
                      setShowPlus(false);
                    }}
                    onBlur={(text) => {
                      setOptionalDetails(text.nativeEvent.text)}}
                  />
                </View>
              )
            }
            <Text style={{ marginLeft: 16, marginTop: 16, fontSize: 16, fontWeight: 'bold' }}>Categories</Text>


          </View>
        </View>
      </TouchableWithoutFeedback>
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
    // textAlign: 'center',
    marginLeft: 16,
    fontSize: 28,
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
  input: {
    flex: 3,
    fontSize: 20,
    lineHeight: 28,

  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    },

  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 64
  },

});

// LOG  {"props": 
// {"props": 
// {"amount": 1.03, "date": 1671840074787, "description": "Newest", "expense": true, "optionalDetails": "", "timestamp": 1671840074788, "uuid": "e11d2e73-e972-4205-ab21-30254b590365"}}}

export default TransactionPage;