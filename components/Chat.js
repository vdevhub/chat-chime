import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Unpack name and bgColor from the route parameters
  const { name, bgColor } = route.params;

  // Set username to the navigation title (once - when component is loaded)
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  // Return chat screen with the selected color
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text>Welcome to Chat Chime, {name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Chat;