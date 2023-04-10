import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Back from '../back';
import Header from '../components/header';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function FirstPrompt({navigation}) {
  return (
    <View style={styles.outerShell}>
      <Header/>
      <Back navigation={navigation}/>
      <View style={styles.container}>
        <Text style={styles.topText}>Have you already started</Text>
        <Text style={styles.topText}>your garden?</Text>
        <Image
          source={require('../assets/people.png')}
          style={styles.image}
        />
        <TouchableOpacity 
          style={styles.buttonOne} 
          onPress={() => navigation.navigate("NumPlants")}>
          <Text style={styles.buttonOneText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonTwo} 
          onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonTwoText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  outerShell: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    alignItems: 'center',
    justifyContent: "flex-start"
  },

  topText: {
    color: "#366652",
    fontSize: 28,
    fontWeight: 'bold',
  }, 

  image: {
    margin: 30,
    width: 300,
    height: 200,
  },

  buttonOne: {
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    height: '4rem',
    marginBottom: '2rem',
    marginTop: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#AFC6B8", 
  },

  buttonTwo: {
    borderRadius: 25,
    borderWidth: 1,
    width: '80%',
    height: '4rem',
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