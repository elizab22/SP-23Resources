import { Image, Text, TouchableOpacity, StyleSheet, View, Modal, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import React, { useState } from 'react';

const horizontal = Dimensions.get('window').width;

// the side modal from the header
export default function Tab({navigation, username, visibility, close}) {

  const [modalVisible, setModalVisible] = useState(false);
  return ( 
    <GestureRecognizer
      onSwipeLeft={() => close()}
    >
      <Modal 
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        transparent={true}
        visible={visibility}
        onRequestClose={() => close()}
      >
        <View style={{alignItems: 'left', flex: 1}}>
          <View style={styles.container}>
              <TouchableOpacity style={{...styles.component, marginLeft: -15}}>
                <Image source={require('../../../assets/images/profile-icon.png')}/>
                  <Text style={styles.text}>My Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.component}
                onPress={() => {close(); navigation.navigate('Dashboard', {navigation: navigation})}}>
                <Image source={require('../../../assets/images/home.png')}/>
                  <Text style={styles.text}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.component}
                onPress={() => {close(); navigation.navigate('Plants', {navigation: navigation})}}
              >
                <Image source={require('../../../assets/images/search.png')}/>
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.component, marginLeft: 5}}>
                <Image style={{width: 27, height: 43}} source={require('../../../assets/images/blackBookmark.png')}/>
                <Text style={{...styles.text, marginLeft: 10}}>Saved</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.component}>
                <Image source={require('../../../assets/images/logout.png')}/>
                <Text style={styles.text}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
      
    </GestureRecognizer>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: horizontal * 0.6,
    backgroundColor: '#BED0BC',
    alignItems: 'left',
  },
  
  component: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },

  text: {
    alignSelf: 'center',
    margin: 5,
  }
})