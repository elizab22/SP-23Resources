import { Image, ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import Title from './title';

const horizontal = Dimensions.get('window').width;

export default function Header ({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.head}
        source={require('../assets/images/head.png')}>
        <TouchableOpacity>
          <Image
            style={styles.menu}
            source={require('../assets/images/menu-icon.png')}/>   
        </TouchableOpacity> 
        <TouchableOpacity> 
          <Title/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.profile}
            source={require('../assets/images/profile-icon.png')}/> 
        </TouchableOpacity> 
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: '#BED0BC',
    marginBottom: 10,
  },

  menu: {
    width: 45,
    height: 45,
  }, 

  profile: {
    width: 68,
    height: 53,

  },
  head: {
    height: 80,
    width: horizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})