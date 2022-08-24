import React from "react";
import { View, StyleSheet, Text} from "react-native"
import { SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import useFirebase from "../hooks/Firebase"
import { FloatingAction } from "react-native-floating-action";

const HomePage = () => {
    
    const firebase = useFirebase();

    const actions = [
        {
          text: "Accessibility",
        //   icon: require("./images/ic_accessibility_white.png"),
          name: "bt_accessibility",
          position: 2
        },
        {
          text: "Language",
        //   icon: require("./images/ic_language_white.png"),
          name: "bt_language",
          position: 1
        },
        {
          text: "Location",
        //   icon: require("./images/ic_room_white.png"),
          name: "bt_room",
          position: 3
        },
        {
          text: "Video",
        //   icon: require("./images/ic_videocam_white.png"),
          name: "bt_videocam",
          position: 4
        }
      ];


    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right', 'top']}>
            <View style={styles.graphPortion}>
                {/* This will be the budget graph */}
            </View>
            <View style={styles.otherPortion}>
                

            </View>
            <FloatingAction
                actions={actions}
                color="#638a7e"
                onPressItem={name => {
                    console.log(name);
                }}/>
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