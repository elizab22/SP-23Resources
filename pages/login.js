import { Text, TextInput, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, ImageBackground, Dimensions, KeyboardAvoidingView } from 'react-native';
import Title from './title';

export default function Login ({navigation}) { 
  return (
    <SafeAreaView style={styles.container}>
        <Title/>
        <Image 
          style={styles.image}
          source={require('../assets/images/ellipse.png')}
        />
        <TextInput
          style={styles.input}
          backgroundColor="#BED0BC"
          placeholder="Email"
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
        />
        <TouchableOpacity onPress={() => navigation.navigate('FirstPrompt')}>
          <Text style={{marginTop: 20}}>New? Register</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  image: {
    margin: 30,
  },

  input: {
    width: 247,
    borderWidth: 1,
    height: 41,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
})