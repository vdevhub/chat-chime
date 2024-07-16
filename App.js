import { Alert, LogBox } from 'react-native';
// Import screens
import Start from './components/Start';
import Chat from './components/Chat';
// Import React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Import NetInfo for connectivity checks
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from", "@firebase", "Support for defaultProps will be removed"]);

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyCVzd0JeprESmvSnBhL23iiOWXXSLkXuNQ",
    authDomain: "chat-chime-2.firebaseapp.com",
    projectId: "chat-chime-2",
    storageBucket: "chat-chime-2.appspot.com",
    messagingSenderId: "537976132151",
    appId: "1:537976132151:web:8fddbe7174d9d46f31e5b2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore Database handler
  const db = getFirestore(app);

  // Initialize Firebase Storage handler
  const storage = getStorage(app);

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
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
