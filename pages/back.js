import { StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

const Back = ({navigation}) => {
  return <TouchableOpacity style={styles.container}>
            <Image source={require('./left.png')}
            />
            <Text style={styles.text}>  Back</Text>
         </TouchableOpacity>;
}

const styles=StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 40,
  },

  text: {
    fontSize: 17,
  },
});

export default Back;