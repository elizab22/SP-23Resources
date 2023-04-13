import { View, Text, TouchableOpacity, StyleSheet, 
  Image, ScrollView, Dimensions } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Header from './components/header';
  import Separator from './components/separator'
import { getUserGardens } from '../src/database';
  
  const horizontal = Dimensions.get('window').width;
  
  
  export default function Dashboard({ navigation }) {
    const [gardens, setGardens] = useState([]);

    useEffect(() => {
        const tempFunc = async () => {
          const tempGardens = await getUserGardens()
          setGardens(tempGardens);
        }
        tempFunc();
    }, [])
  
  
    var total = [];
    for (let i = 0; i < gardens.length; i++) {
      total.push(
        <TouchableOpacity key={gardens[i].id} style={styles.garden}>
            <TouchableOpacity style={styles.topHalf} onPress={() => {
              navigation.navigate("Garden", {"id": gardens[i].id})
            }}>
            </TouchableOpacity>
            <View style={styles.bottom}>
              <Text>{gardens[i].name}</Text>
            </View>
          </TouchableOpacity>
      )
    }
  
    return (
       <View style={styles.container}>
        <Header navigation={navigation}/>
        <View style={styles.top}>
          <Text style={styles.title}>MY GARDENS</Text>
          <Separator/>
        </View>
        <ScrollView contentContainerStyle={styles.gardens}>
          {total}
        </ScrollView>
        <TouchableOpacity style={styles.add} onPress={() => navigation.navigate("NewGarden")}>
          <Image 
            source={require('../../assets/images/add.png')}
            style={styles.add}/>
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
      alignItems: 'center',
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