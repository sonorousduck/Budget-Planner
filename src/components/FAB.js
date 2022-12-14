import React from "react";
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const FAB = () => {
  const actions = [
    {
      text: "Create New Transaction",
      icon: require("../../assets/dollar-sign-16975.png"),
      name: "CreateNewTransaction",
      position: 1
    },
    {
      text: "Create New Budget Allocation",
      icon: require("../../assets/icons8-coin-wallet-96.png"),
      name: "CreateNewBudget",
      position: 2
    },
  ];
  const navigation = useNavigation();

  return (
    <FloatingAction
      actions={actions}
      color="#8b8b8b"
      onPressItem={name => {
        if (name === "CreateNewTransaction") {
          navigation.navigate("CreateNewTransaction")
        } else if (name === "CreateNewBudget") {
          navigation.navigate("CreateNewBudgetPage", {screen: 'BudgetPage', initial: false})
        }
      }} />
  );
}

export default FAB;