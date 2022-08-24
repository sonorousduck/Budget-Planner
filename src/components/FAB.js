import React from "react";
import { FloatingAction } from "react-native-floating-action";


const FAB = () => {
    const actions = [
        {
          text: "Create New Transaction",
          icon: require("../../assets/favicon.png"),
          name: "bt_new_transaction",
          position: 1
        },
        {
          text: "Create New Budget Allocation",
          icon: require("../../assets/favicon.png"),
          name: "bt_budget",
          position: 2
        },
      ];
    
    return (
        <FloatingAction
                actions={actions}
                color="#638a7e"
                onPressItem={name => {
                    console.log(name);
                }}/>
    );
}

export default FAB;