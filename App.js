import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { FirebaseProvider } from './src/hooks/Firebase';
import useFirebase from './src/hooks/Firebase'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/views/HomePage'
import BudgetPage from './src/views/BudgetPage';
import SettingsPage from './src/views/SettingsPage';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Provider as PaperProvider } from 'react-native-paper';
import LoginPage from './src/views/LoginPage';
import CreateAccountPage from './src/views/CreateAccountPage';
import { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import ProjectsPage from './src/views/ProjectsPage';
import TransactionPage from './src/views/TransactionPage';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const auth = getAuth();

const NavContainer = () => {
  const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser, currentGroup, setCurrentGroup, currentTransactions, setCurrentTransactions } = useFirebase();
  
  useEffect(() => {
    setSignedIn(auth.currentUser)
    setCurrentGroup(auth.currentUser);
  })

  useEffect(() => {
    if (currentGroup) {
      setCurrentTransactions(firebase.getCurrentMonthTransactions(currentGroup, currentTransactions, setCurrentTransactions));
    }
  }, [currentGroup])


  const Homestack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomePage} options={{headerShown: false}}/>
        <Stack.Screen name="Transaction" component={TransactionPage} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      {signedIn ? (
        <>
      <StatusBar style='dark'/>
        <Tab.Navigator initialRouteName='Home'>
          <Tab.Screen name="Home" component={Homestack} 
            options={{
              title: 'Transactions',
              headerShown: false,
              tabBarIcon: () => <FontAwesome5 name="dollar-sign" size={20} color="black" />}}
            />
          <Tab.Screen name="Budget" component={BudgetPage} 
            options={{
              title: "Budget",
              headerShown: false, 
              tabBarIcon: () => <FontAwesome5 name="money-bill-alt" size={20} color="black" />}} 
            />

          <Tab.Screen name="Projects" component={ProjectsPage} 
            options={{
              title: "Projects",
              headerShown: false, 
              tabBarIcon: () => <FontAwesome5 name="project-diagram" size={20} color="black" />}} 
            />
          
          <Tab.Screen name="Search" component={ProjectsPage} 
            options={{
              title: "Search",
              headerShown: false, 
              tabBarIcon: () => <FontAwesome5 name="search" size={20} color="black" />}} 
            />
          <Tab.Screen name="Account" component={SettingsPage} 
          options={{
              title: "Account", 
              headerShown: false,
              tabBarIcon: () => <Ionicons name="person" size={20} color="black" />}} 
          />
        </Tab.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="Transaction" component={TransactionPage} options={{headerShown: false}} />
        </Stack.Navigator> */}
        </>
      ) : (
        <>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginPage} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="CreateAccount" component={CreateAccountPage} options={{
            headerShown: false
          }}/>
        </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  )
}




export default function App() {


  return (
    <PaperProvider>
      <SafeAreaProvider>
        <FirebaseProvider>
          <NavContainer />
        </FirebaseProvider>
      </SafeAreaProvider>
    </PaperProvider>

  );
}

