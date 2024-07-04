import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Import screens
import Start from './components/Start';
import Chat from './components/Chat';
// Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Create the navigator
const Stack = createNativeStackNavigator();

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from", "You are initializing Firebase Auth for React Native without", "Support for defaultProps will be removed"]);

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBT5gervbc_Ktcl6J_9O0DGtTYiSjh8Kr0",
    authDomain: "chat-chime.firebaseapp.com",
    projectId: "chat-chime",
    storageBucket: "chat-chime.appspot.com",
    messagingSenderId: "481950216373",
    appId: "1:481950216373:web:c704bb1d71c411d5b00efc"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    // Create navigator container to wrap up all content
    <NavigationContainer>
      {/* Navigator has the default route Start - first screen */}
      <Stack.Navigator
        initialRouteName="Start"
      >
        {/* One screen is the Start */}
        <Stack.Screen
          name="Start"
          component={Start}
        />
        {/* One screen is the Chat */}
        <Stack.Screen
          name="Chat"
        >
          {/* Pass firebase db to Chat */}
          {props => <Chat db={db} component={Chat} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
