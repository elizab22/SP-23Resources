import { Text, TextInput, StyleSheet, Image, SafeAreaView, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import Title from './title';

const horizontal = Dimensions.get('window').width;
const vertical = Dimensions.get('window').height;

export default function Login ({navigation}) { 
  return (
    <View style={styles.container}>
      <ImageBackground 
        style={styles.background}
        source={require('./loginBackground.png')}>
        <Title/>
        <Image 
          style={styles.image}
          source={require('./logo.png')}
        />
        <TextInput
          style={styles.input}
          backgroundColor="#BED0BC"
          placeholder="Username"
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
})