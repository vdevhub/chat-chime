import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Import screens
import Start from './components/Start';
import Chat from './components/Chat';
// Import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

export default function App() {
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
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
