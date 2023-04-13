import { SafeAreaView, View, Image, TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';
import Title from './components/title';
const background = {uri: './plantbackground.png'}

export default function Landing ({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/images/plantbackground.png')}
        resizeMode="cover"
       >
       <Title/>
      <Text style={styles.action}>Let's build your garden</Text>
      <TouchableOpacity 
      style={styles.start} 
      onPress={() => navigation.navigate('Login')}>
        <Text style={styles.startText}>Get Started</Text>
        <Image 
          source={require('../../assets/images/next.png') }
          style={styles.startImage}/>
      </TouchableOpacity>
       </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  action: {
    marginTop: 20,
    fontSize: 20,
  },

  start: {
    flexDirection: 'row',
    width: 241,
    height: 45,
    padding: 7, 
    marginTop: 70,
    borderWidth: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  startText: {
    fontSize: 17,
  },

  startImage: {
    width: 23,
    height: 23,
  },

  backgroundImage: {
    flex: 1,
    width: 400,
    height: 890,
    alignItems: 'center',
    justifyContent: 'center',
  }
})