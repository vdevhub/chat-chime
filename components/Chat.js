import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  // Unpack name and bgColor from the route parameters
  const { name, bgColor, userID } = route.params;
  // Messages state initialization
  const [messages, setMessages] = useState([]);
  // Callback for when a message is sent
  // Sends the newest message to Firestore
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  }

  // Set username to the navigation title (once - when component is loaded)
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Sets up an onSnapshot listener on a query targeting the messages collection in Firebase
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(message => {
        newMessages.push({
          id: message.id,
          ...message.data(),
          createdAt: new Date(message.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
    });
    // Clean up code when the component is unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, []);

  // Return chat screen with the selected color
  // Return GiftedChat component with messages and input
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userID,
          name: name
        }}
      />
      {/* Conditional to fix the Android keyboard not to hide the message input */}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Chat;