import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet} from "react-native"
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { Ionicons } from '@expo/vector-icons';

const AccountPage = () => {
    
    const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup } = useFirebase();
    const [groups, setGroups] = useState([])
    const [name, setName] = useState("")

    useEffect(() => {
      firebase.getAllGroups(currentUser, setGroups)
      firebase.getName(currentUser.email, setName)
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
                  {currentUser.email}
                </Text>
              </View>

            </View>

            <View style={styles.groups}>
              <Text style={{fontSize: 16, color: 'grey', marginBottom: 8}}>Groups</Text>
              <View style={{height: 200}}>
                {groups.map((group, index) => (
                  <View key={index} style={{width: '100%'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Button 
                      onPress={() => {
                        if (group == currentUser.email.substring(0, currentUser.email.indexOf('@'))) {
                          console.log(group)
                          firebase.setActiveGroup(currentUser, "default", setCurrentGroup);
                          return;
                        }
                        if (currentGroup == group) {
                          console.log("Already selected")
                          return;
                        }
                        firebase.setActiveGroup(currentUser, group, setCurrentGroup)
                      }}
                      mode="outlined"
                      style={{borderRadius: 4, alignItems: 'flex-start'}}
                    >{group}</Button>
                  </View>
                  </View>

                  ))}
              </View>
            </View>

          <Button 
            mode="outlined"
            onPress={() => {
              firebase.signOut(setSignedIn)
            }}
            style={{width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: 32, borderRadius: 0, borderColor: 'lightgrey', marginBottom: 16}}
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

  },
});

export default AccountPage;