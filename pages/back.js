import { StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default Back = ({navigation}) => {
  return <TouchableOpacity onPress={() => navigation.goBack()} style={styles.container}>
            <Image source={require('./assets/left.png')}
            />
            <Text style={styles.text}>  Back</Text>
         </TouchableOpacity>;
}

const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 17,
  },
});

