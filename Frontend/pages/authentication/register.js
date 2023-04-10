import { Text, TextInput, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Title from '../title';
import { useEffect, useState } from 'react';
import Back from "../back"
import { authEventListener, login, register } from '../../src/authentication.js'
import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from '../../src/database';

const horizontal = Dimensions.get('window').width;
const vertical = Dimensions.get('window').height;



export default function Register ({navigation}) { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageAssets, setImageAssets] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  useEffect(() => {
    const listener = authEventListener(() => navigation.navigate("Dashboard"));
    return listener;
  }, [])

  const emptyImage = <View style={styles.emptyImage}>
      <Image style={styles.emptyProfilePic} source={require("../assets/edit-image.png")}></Image>
  </View>

  return (
    <View style={styles.container}>
      <ImageBackground 
      style={styles.background}
        source={require('../assets/loginBackground.png')}>

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
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  emptyImage: {
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 5,
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

  background: {
    width: horizontal,
    height: vertical,
    resizeMode: 'contain',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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