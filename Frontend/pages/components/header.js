import { Image, ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';
import Title from '../title';
// import MenuNavigator from '../MenuNavigator';
import { userRef, profilePic as authProfilePic } from '../../src/authentication';
import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';

const horizontal = Dimensions.get('window').width;

const Header = ({navigation}) => {

  useEffect(() => {
    const tempFunc = async () => {
      const profilePic = await (await getDoc(userRef)).data().profilePic
      if (profilePic) {
        setProfilePic(profilePic)
      }
    }
    if (!authProfilePic || authProfilePic === "none") {
      tempFunc()
    } else {
      setProfilePic(authProfilePic)
    }
  }, [])

  const [profilePic, setProfilePic] = useState()

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.head}
        source={require('../assets/head.png')}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            style={styles.menu}
            source={require('../assets/menu-icon.png')}/>   
        </TouchableOpacity> 
        <TouchableOpacity> 
          <Title/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={profilePic ? styles.hasProfilePic : styles.profile}
            source={profilePic ? {uri: profilePic} : require('../assets/profile-icon.png')}/> 
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

  hasProfilePic: {
    borderRadius: 27, 
    width: 55,
    height: 55,
  },

  head: {
    height: 80,
    width: horizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
})

export default Header;