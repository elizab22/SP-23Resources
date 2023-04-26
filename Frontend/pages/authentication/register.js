import { Text, TextInput, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { authEventListener, register } from '../../src/authentication.js'
import * as ImagePicker from 'expo-image-picker';

export default function Register ({navigation}) { 

  // state to keep track of email, password, and image
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageAssets, setImageAssets] = useState(null);

  const pickImage = async () => {
    // no permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (result.assets != null) {
      setImageAssets(result.assets);
    }
  }


  // make sure fields are filled out and passwords match
  const onRegister = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill out all fields");
        return;
    } else if (password != confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    await register(email, password, imageAssets);
  }

  // when user logs in and take them to their dashboard or if they are already logged in
  // skip this page and go to dashboard
  useEffect(() => {
    const listener = authEventListener(() => navigation.navigate("Dashboard"));
    return listener;
  }, [])

  const emptyImage = <View style={styles.emptyImage}>
      <Image style={styles.emptyProfilePic} source={require("../../../assets/images/profile-icon.png")}></Image>
  </View>

  return (
    <View style={styles.container}>
    
        <TouchableOpacity onPress={pickImage}>
          <View>
              {imageAssets ? <Image style={styles.profilePic} source={{uri: imageAssets[0].uri}}></Image> : emptyImage}
          </View>
        </TouchableOpacity>

        <TextInput
          autoFocus={true}
          autoCorrect={false}
          autoCapitalize='none'
          onChange={(event) => setEmail(event.nativeEvent.text)}
          style={styles.input}
          backgroundColor="#BED0BC"
          placeholder="Email"
          placeholderTextColor="#000"
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          onChange={(event) => {
            setPassword(event.nativeEvent.text)
          }}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
        />
        <TextInput
          autoCorrect={false}
          autoCapitalize='none'
          onChange={(event) => {
            setConfirmPassword(event.nativeEvent.text)
          }}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={onRegister}>
          <Text style={styles.button}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => navigation.navigate("Login")}>
          <Text style={styles.button}>Have an Account? Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyImage: {
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 3,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },

  emptyProfilePic: {
    width: 75,
    height: 75,
  },

  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },

  
  input: {
    width: 247,
    borderWidth: 1,
    height: 41,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    
  },
  button: {
    width: '80%',
    marginTop: 10
  }
})