import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Image, ScrollView, Dimensions
} from 'react-native';
import Header from './header';
import Separator from './separator.js';

const horizontal = Dimensions.get('window').width;


export default function Garden() {
  const [numGardens, setNumGardens] = useState(1);

  addGardens = () => {
    setNumGardens(numGardens + 1)
  }

  var total = [];
  for (let i = 1; i < numGardens; i++) {
    total.push(
      <TouchableOpacity style={styles.garden}>
        <TouchableOpacity style={styles.topHalf}>
        </TouchableOpacity>
        <View style={styles.bottom}>
          <Text>Garden {i}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.top}>
        <Text style={styles.title}>MY GARDENS</Text>
        <Separator />
      </View>
      <ScrollView style={styles.gardens} contentContainerStyle={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.garden}>
          <TouchableOpacity style={styles.topHalf}>
          </TouchableOpacity>
          <View style={styles.bottom}>
            <Text>New Garden</Text>
          </View>
        </TouchableOpacity>
        {total}
      </ScrollView>
      <TouchableOpacity style={styles.add} onPress={addGardens}>
        <Image
          source={require('./add.png')}
          style={styles.add} />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  gardens: {
    paddingTop: 30,
    flex: 1,
    // alignItems: 'center',
  },

  garden: {
    width: horizontal * .8,
    height: 200,
    flex: 1,
  },

  topHalf: {
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
    height: 120,
  },


  bottom: {
    borderRadius: 15,
    alignItems: 'left',
    fontSize: 30,
    height: 50,
  },

  top: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    marginTop: 30,
    fontSize: 28,
    alignSelf: 'center',
  },

  add: {
    margin: 20,
    alignItems: 'flex-end',
    bottom: 5,
  }
})