import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  // Unpack name and bgColor from the route parameters
  const { name, bgColor } = route.params;
  // Messages state initialization
  const [messages, setMessages] = useState([]);
  // Callback for when a message is sent
  // Takes the previous messages and appends new one
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  }

  // Set username to the navigation title (once - when component is loaded)
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Setting the messages state with initial static messages
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer!',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://avatar.iran.liara.run/public/29',
        },
      },
      {
        _id: 2,
        text: 'You\'ve entered the chat, welcome!',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Return chat screen with the selected color
  // Return GiftedChat component with messages and input
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2
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