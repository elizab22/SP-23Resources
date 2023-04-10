import { View, StyleSheet, Text , Image, TouchableOpacity } from 'react-native';
import Header from '../components/header';
import Back from '../back';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function NumPlants({navigation}) {
  return (
    <View style={styles.container}>
      <Header/>
      <Back navigation={navigation}/>
      <Text style={styles.question}>How many plants do you</Text>
      <Text style={styles.question}>already have?</Text>
      <Image 
        source={require('../assets/mother-earth.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start"
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

