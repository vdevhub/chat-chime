import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
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

  let unsubMessages;

  // Sets up an onSnapshot listener on a query targeting the messages collection in Firebase
  useEffect(() => {
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(message => {
          newMessages.push({
            id: message.id,
            ...message.data(),
            createdAt: new Date(message.data().createdAt.toMillis())
          })
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code when the component is unmounted
    return () => {
      if (unsubMessages) unsubMessages();
    }
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("chat_messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (messagesToCache) => {
    // AsyncStorage is asynchronous, returns a promise, accepts only strings
    try {
      await AsyncStorage.setItem('chat_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  // Return chat screen with the selected color
  // Return GiftedChat component with messages and input
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        renderInputToolbar={renderInputToolbar}
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