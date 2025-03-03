import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const colors = ['#090C08', '#28008D', '#5F45BF', '#95CCFB'];
  const [name, setName] = useState('');
  const [bgColor, setBackground] = useState('');
  // Initialize Firebase authentication handler
  const auth = getAuth();

  // Sign in function that authenticates the user in Firebase
  // If success, navigates to the Chat
  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { userID: result.user.uid, name: name, bgColor: bgColor });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.imageBackground}>
        <Text style={styles.appTitle}>Chat Chime</Text>
        <View style={styles.chatSettings}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <View style={styles.bgColorPalette}>
            <Text style={styles.bgColorPaletteText}>Choose Background Color:</Text>
            <View style={styles.bgColorPaletteIcons}>
              {/* Map the colors hex codes from the array to color buttons */}
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Tap to select"
                  accessibilityHint="Let's you choose background color for your chat screen"
                  style={[
                    styles.colorButton,
                    { backgroundColor: color }
                  ]}
                  // Sets the color based on the pressed button
                  onPress={() => setBackground(color)}
                />
              ))}
            </View>
          </View>
          {/* Start Chatting button calls the sign in function upon pressing */}
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* Conditional to fix the iOS keyboard not to hide the name input */}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
  },
  appTitle: {
    flex: 1,
    marginTop: "25%",
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
  },
  chatSettings: {
    flex: 1,
    justifyContent: "space-between",
    width: "88%",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "44%",
    marginBottom: "6%",
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    color: "#757083",
    opacity: 50,
  },
  bgColorPaletteText: {
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    marginBottom: 10,
  },
  bgColorPaletteIcons: {
    flexDirection: "row",
    width: "88%",
    justifyContent: "space-between",
  },
  colorButton: {
    alignSelf: "flex-start",
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5
  },
  button: {
    width: "88%",
    backgroundColor: "#5F45BF",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    padding: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: "#fff",
  }
});

export default Start;