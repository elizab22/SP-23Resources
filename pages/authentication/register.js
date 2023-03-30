import { Text, TextInput, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Title from '../title';
import { useEffect, useState } from 'react';
import Back from "../back"
import { authEventListener, login, register } from '../../src/authentication.js'

const horizontal = Dimensions.get('window').width;
const vertical = Dimensions.get('window').height;

export default function Register ({navigation}) { 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onRegister = async () => {
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill out all fields");
        return;
    } else if (password != confirmPassword) {
        alert("Passwords don't match");
        return;
    }
    await register(email, password);
  }

  useEffect(() => {
    const listener = authEventListener(() => navigation.navigate("Dashboard"));
    return listener;
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background}
        source={require('../assets/loginBackground.png')}>
        <Title/>
        <Image 
          style={styles.image}
          source={require('../assets/logo.png')}
        />

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