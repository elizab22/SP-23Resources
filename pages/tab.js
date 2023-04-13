import { Image, Text, TouchableOpacity, StyleSheet, View, Modal, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import React, { useState } from 'react';

const horizontal = Dimensions.get('window').width;

export default function Tab({navigation, username, tabVisible, close}) {
  
  function goTo(location) {
    close();
    navigation.navigate({location})
  }

  return ( 
    <GestureRecognizer
      onSwipeLeft={() => close()}
    >
      <Modal 
        animationType='slide'
        transparent={true}
        visible={tabVisible}
        onRequestClose={() => close()}
      >
        <View style={{alignItems: 'left', flex: 1}}>
          <View style={styles.container}>
              <TouchableOpacity style={styles.component}>
                <Image source={require('../assets/images/profile-icon.png')}/>
                  <Text style={styles.text}>{username}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.component}
                onPress={() => goTo("Garden")}>
                <Image source={require('../assets/images/home.png')}/>
                  <Text style={styles.text}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.component}
                onPress={() => {close(); navigation.navigate('Plants')}}
              >
                <Image source={require('../assets/images/search.png')}/>
                <Text style={styles.text}>Search</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.component}>
                <Image source={require('../assets/images/bookmark.png')}/>
                <Text style={styles.text}>Saved</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.component}>
                <Image source={require('../assets/images/logout.png')}/>
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
  },
  
  component: {
    flexDirection: 'row',
    margin: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  text: {
    alignSelf: 'center',
    margin: 5,
  }
})