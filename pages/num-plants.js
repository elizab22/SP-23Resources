import { View, StyleSheet, Text , Image, TouchableOpacity } from 'react-native';
import Header from './header';
import Back from './back';

export default function NumPlants({navigation}) {
  return (
    <View style={styles.container}>
      <Header/>
      <Back/>
      <Text style={styles.question}>How many plants do you</Text>
      <Text style={styles.question}>already have?</Text>
      <Image 
        source={require('./mother-earth.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
 
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    color: "#366652",
  },

  image: {
    alignSelf: 'center',
    margin: 30,
  }

})

