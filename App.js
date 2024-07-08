import { Alert } from 'react-native';
// Import screens
import Start from './components/Start';
import Chat from './components/Chat';
// Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
// Import NetInfo for connectivity checks
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";

// Create the navigator
const Stack = createNativeStackNavigator();

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from", "@firebase", "Support for defaultProps will be removed"]);

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MSG_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
  };

  // Initialize Firebase
  let app = null;

  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.log('Error - could not initialize connection to Firebase');
    Alert.alert('Chat couldn\'t initialize connection to the storage service. Try again later.');
  }

  // Initialize Cloud Firestore and get a reference to the service
  let db = null;

  try {
    db = getFirestore(app);
  } catch (error) {
    console.log('Error - could not load Firestore database');
    Alert.alert('Chat couldn\'t connect to the database. Try again later.');
  }

  // Note that connectionStatus.isConnected is used as a dependency value of useEffect(). 
  // This means that if this value changes, the useEffect code will be re-executed. 
  // For example, if you lose connection while using the app, you should see a “Connection lost!” alert.
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

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
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} component={Chat} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
