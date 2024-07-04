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

const configData = require('./config.json');

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from", "You are initializing Firebase Auth for React Native without", "Support for defaultProps will be removed"]);

const App = () => {
  const firebaseConfig = {
    apiKey: configData.apiKey,
    authDomain: configData.authDomain,
    projectId: configData.projectId,
    storageBucket: configData.storageBucket,
    messagingSenderId: configData.messagingSenderId,
    appId: configData.appId
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
        {/* Second screen is the Chat */}
        <Stack.Screen
          name="Chat"
        >
          {/* Pass Firebase db object to Chat */}
          {props => <Chat db={db} component={Chat} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
