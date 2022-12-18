import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FirebaseProvider } from './src/hooks/Firebase';
import useFirebase from './src/hooks/Firebase'
import currentUser from './src/hooks/Auth'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(currentUser != undefined);
  const firebase = useFirebase();
  


  return (
    <PaperProvider>
      <SafeAreaProvider>
        <FirebaseProvider>
          <NavigationContainer>

            {isSignedIn ? (
              <>
            <StatusBar style='dark'/>
              <Tab.Navigator>
                <Tab.Screen name="Home" component={HomePage} 
                options={{
                  title: 'Home',
                  headerShown: false,
                  tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}/>
                <Tab.Screen name="Budget" component={BudgetPage} 
                  options={{
                    title: "Budget",
                    headerShown: false, 
                    tabBarIcon: () => <FontAwesome5 name="money-bill-alt" size={24} color="black" />}} />
                <Tab.Screen name="Settings" component={SettingsPage} options={{
                    title: "Settings", 
                    headerShown: false,
                    tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="black" />}} />
              </Tab.Navigator>
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
        </FirebaseProvider>
      </SafeAreaProvider>
    </PaperProvider>

  );
}

