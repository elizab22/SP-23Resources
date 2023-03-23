import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Header from './header';

export default function FirstPrompt({navigation}) {
  return (
    <View style={styles.outerShell}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.topText}>Have you already started</Text>
        <Text style={styles.topText}>your garden?</Text>
        <Image
          source={require('./people.png')}
          style={styles.image}
        />
        <TouchableOpacity 
          style={styles.buttonOne} 
          onPress={() => navigation.navigate("NumPlants")}>
          <Text style={styles.buttonOneText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonTwo} 
          onPress={() => navigation.navigate("Location")}>
          <Text style={styles.buttonTwoText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  outerShell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  topText: {
    color: "#366652",
    fontSize: 28,
    fontWeight: 'bold',
  }, 

  image: {
    margin: 30,
    width: 348,
    height: 273
  },

  buttonOne: {
    borderRadius: 25,
    borderWidth: 1,
    width: 368,
    height: 97,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#366652", 
  },

  buttonTwo: {
    borderRadius: 25,
    borderWidth: 1,
    width: 368,
    height: 97,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOneText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },

  buttonTwoText: {
    color: "#366652",
    fontSize: 23,
    fontWeight: 'bold',
  },

})