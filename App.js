import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FirebaseProvider } from './src/hooks/Firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomePage from './src/views/HomePage'
import BudgetPage from './src/views/BudgetPage';
import SettingsPage from './src/views/SettingsPage';
import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'; 



const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <SafeAreaProvider>
      <FirebaseProvider>
        <NavigationContainer>
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
        </NavigationContainer>
      </FirebaseProvider>
    </SafeAreaProvider>

  );
}

