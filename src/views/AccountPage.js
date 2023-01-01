import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet} from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const AccountPage = () => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();
    const [groups, setGroups] = useState([])
    const [name, setName] = useState("")
    const navigation = useNavigation();

    useEffect(() => {
      firebase.getAllGroups(currentUser, setGroups)
      firebase.getName(currentUser.email, setName)
      console.log(currentGroup)
    }, [])

    return (
      <SafeAreaView style={{ flex: 1 }} edges={['left', 'right', 'top']}>
        <ScrollView style={{height: '100%'}}>
            <View style={styles.profile}>
              <View style={{flex: 10}}>
                <Ionicons name="person-circle-outline" size={250} style={{alignSelf: 'center', justifyContent: 'center'}}/>
              </View>

              <View style={{flex: 3}}>
                <Text style={{textAlign: 'center', fontSize: 24, marginBottom: 8}}>
                  {name} 
                </Text>
                <Text style={{textAlign: 'center', fontSize: 16, color: 'grey'}}>
                  {currentUser?.email ?? ""}
                </Text>
              </View>

            </View>

            <View style={styles.groups}>
              <Text style={{fontSize: 16, color: 'grey', marginBottom: 8}}>Groups</Text>
              <View style={{backgroundColor: 'rgba(192, 192, 192, 0.05)', borderRadius: 8}}>
                {groups.map((group, index) => (
                  <TouchableWithoutFeedback key={index} style={styles.groupSelector} onPress={() => {
                    let email = currentUser.email.substring(0, currentUser.email.indexOf('@'))
                    if (currentGroup == group || (group == email && (currentGroup=="default"))) {
                      console.log("Already selected")
                      return;
                    }
                    if (group == email) {
                      firebase.setActiveGroup(currentUser, "default", setCurrentGroup);
                      console.log(group)

                      return;
                    }
                    firebase.setActiveGroup(currentUser, group, setCurrentGroup)
                    console.log(group)
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {currentGroup == group || (currentGroup == "default" && group == currentUser.email.substring(0, currentUser.email.indexOf('@'))) || (group == currentUser.email.substring(0, currentUser.email.indexOf('@')) && currentGroup == currentUser.email.substring(0, currentUser.email.indexOf('.'))) ? (
                      <Ionicons name="checkmark" size={20} style={{flex: 1, justifyContent: 'center', color: 'green'}}/>
                    ) 
                    :
                    (
                      <View style={{flex: 1}}/>
                    )
                    }
                    <View style={{flex: 8}}>
                      <Text style={{fontSize: 14}}>{group==currentUser.email.substring(0, currentUser.email.indexOf('@')) ? "My Transactions" : `${group}`}</Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>

                  ))}
              </View>
            </View>

          <Button 
            mode="outlined"
            onPress={() => {
              firebase.signOut(setSignedIn)
              navigation.navigate("Login")
            }}
            style={styles.logOut}
            labelStyle={{color: 'red'}}
            >Log Out</Button>

          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  profile: {
    height: 400,
    backgroundColor: 'lightgrey',
    marginBottom: 8,
    width: '95%',
    borderRadius: 20,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  groups: {
    marginHorizontal: 8,
    marginTop: 16,

  },
  logOut:  {
    width: '95%', 
    marginLeft: 'auto',
    marginRight: 'auto', 
    marginTop: 32, 
    borderRadius: 0, 
    borderColor: 'lightgrey', 
    marginBottom: 16
  },
  groupSelector: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    padding: 16,
    

  }

});

export default AccountPage;