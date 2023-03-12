import { Text, TextInput, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

export default function Login () {
  let [fontsLoaded] = useFonts({
    'Orbitron': require('./assets/fonts/Orbitron-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  return (
    <View style={styles.container}>
      <Text>PLANIT</Text>
      <Image 
        style={styles.image}
        source={require('./logo.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>New? Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'fff',
  },

  title: {
    fontFamily: 'Orbitron',
    fontSize: 50,
  },

  input: {
    width: '80%',
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  image: {

  },

  button: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    backgroundColor: '#BED0BC',
  },
})