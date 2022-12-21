import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { FirebaseProvider } from './src/hooks/Firebase';
import useFirebase from './src/hooks/Firebase'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/views/HomePage'
import BudgetPage from './src/views/BudgetPage';
import SettingsPage from './src/views/SettingsPage';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { Provider as PaperProvider } from 'react-native-paper';
import LoginPage from './src/views/LoginPage';
import CreateAccountPage from './src/views/CreateAccountPage';
import { useEffect, useState } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';


import { getAuth } from "firebase/auth";


// const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const auth = getAuth();

const NavContainer = () => {
  const { firebase, signedIn, setSignedIn, currentUser, setCurrentUser } = useFirebase();
  
  useEffect(() => {
    setSignedIn(auth.currentUser)
  })


  return (
    <NavigationContainer>

            {signedIn ? (
              <>
            <StatusBar style='dark'/>
              <Drawer.Navigator initialRouteName='Home'>
                <Drawer.Screen name="Home" component={HomePage} 
                options={{
                  title: 'Home',
                  headerShown: false,
                  drawerLabel: "Home",
                  drawerIcon: () => <AntDesign name="home" size={24} color="black" />}}
                />
                <Drawer.Screen name="Budget" component={BudgetPage} 
                  options={{
                    title: "Budget",
                    headerShown: false, 
                    drawerIcon: () => <FontAwesome5 name="money-bill-alt" size={24} color="black" />}} 
                  />
                <Drawer.Screen name="Settings" component={SettingsPage} 
                options={{
                    title: "Settings", 
                    headerShown: false,
                    drawerIcon: () => <Ionicons name="settings-outline" size={24} color="black" />}} 
                />
              </Drawer.Navigator>
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

