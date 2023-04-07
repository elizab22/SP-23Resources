import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

const Back = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
      <Image source={require('./left.png')} />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 40,
  },

  text: {
    fontSize: 16,
    marginLeft: 6,
  },
});

export default Back;