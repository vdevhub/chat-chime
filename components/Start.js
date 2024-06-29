import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const [name, setName] = useState('');
  const [bgColor, setBackground] = useState('');

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
                  accessibilityHint="Choose background color for your chat screen"
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
          {/* Start Chatting button navigates to the Chat screen upon pressing and passes props */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat', { name: name, bgColor: bgColor })}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    opacity: "50%",
  },
  bgColorPaletteText: {
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: "100%",
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
    backgroundColor: "#757083",
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