import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { FirebaseProvider } from './src/hooks/Firebase';
import HomePage from './src/views/HomePage'

export default function App() {
  return (
    <FirebaseProvider>
      <SafeAreaView style={styles.container}>
        <HomePage/>
      </SafeAreaView>
    </FirebaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
