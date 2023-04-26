import { Image, ImageBackground, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Dimensions} from 'react-native';
import Title from './title';
// import MenuNavigator from '../MenuNavigator';
import { userRef, profilePic as authProfilePic } from '../../src/authentication';
import { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';
import Menu from './menu';

const horizontal = Dimensions.get('window').width;

const Header = ({navigation}) => {

  // set profile picture of user after loading it from database
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

  // state for user profile pic
  const [profilePic, setProfilePic] = useState()

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.head}
        source={require('../../../assets/images/head.png')}>
        <Menu navigation={navigation}/>
        <TouchableOpacity> 
          <Title/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={profilePic ? styles.hasProfilePic : styles.profile}
            source={profilePic ? {uri: profilePic} : require('../../../assets/images/profile-icon.png')}/> 
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