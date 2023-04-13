import { FlatList, Text, StyleSheet, SafeAreaView, Image, ImageBackground, 
  Dimensions, View, Card, ScrollView,
  TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
  import React, { useState } from 'react';
  import {SearchBar} from 'react-native-elements';
  import PLANTS from './listPlants';
  import ShowModal from './plantInfo';
  import Filter from './filter';
  import Tab from './tab';
  
  
  const horizontal = Dimensions.get('window').width;
  const vertical = Dimensions.get('window').height;
  
  
  export default function Plants({navigation}) {
    const[tabVisible, setTabVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEntry, setModalEntry] = useState(0);
    const [search, setSearch] = useState("");
    const[searchPlants, setSearchPlants] = useState(PLANTS);
    
    const updateSearch = (search) => {
    setSearch({search});
    setSearchPlants(
    PLANTS.filter((plant) => 
      JSON.stringify(plant).split(" ").join("").toLowerCase().includes(search.split(" ").join("").toLowerCase())
    )
    );
  }
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.top}>
        <ImageBackground
          style={styles.head}
          source={require('../assets/images/head.png')}>
          <TouchableOpacity onPress={() => setTabVisible(true)}>
            <Image
              style={styles.menu}
              source={require('../assets/images/menu-icon.png')}/>   
          </TouchableOpacity> 
          <View>
          <SearchBar
            leftIconContainerStyle={styles.magnify}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.inputStyle}
            inputStyle={styles.search}
            searchIcon={false}
            placeholderTextColor={'gray'}
            placeholder={"Search..."}
            value={search}
            onChangeText={text => updateSearch(text)}
          />
          </View>
          <TouchableOpacity>
            <Image
              style={styles.profile}
              source={require('../assets/images/profile-icon.png')}/> 
          </TouchableOpacity> 
        </ImageBackground>
      </View>
      <Filter/>
      <SafeAreaView style={styles.container}>
        <FlatList 
          directionalLockEnabled={true}
          data={searchPlants}
          style={styles.column}
          renderItem={({item}) => (
            <View>
              <View style={{alignItems: 'center', margin: 10}}>
              <TouchableOpacity style={styles.box}  
                onPress={() => {
                setModalVisible(true);
                setModalEntry(item);
                }
                }>
                <ImageBackground 
                  style={styles.plantIcons}
                  source={item.image} resizeMode='center'>
                </ImageBackground>
              </TouchableOpacity>
              <Text style={styles.plantName}>{item.name}</Text>
              <Text style={styles.scientificName}>{item.scientificName}</Text>
              </View>
              <ShowModal
                prop={modalEntry}
                modalVisible={modalVisible}
                close={() => setModalVisible(false)}
              />  
            </View> 
          )}
          numColumns={2}
        />
      </SafeAreaView>
      </View>
    )
  }
  
  
  const styles= StyleSheet.create({
    top: {
      paddingTop: 25,
      backgroundColor: '#BED0BC',
      flexDirection: 'row',
      marginBottom: 10,
    },
  
    head: {
      height: 80,
      width: horizontal,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  
    search: {
      color: '#000000',
      alignSelf: 'center',
    },
  
    searchContainer: {
      alignSelf: 'center',
      backgroundColor: '#BED0BC',
      width: 170,
      height: 58,
    },
  
    inputStyle: {
      backgroundColor: '#BED0BC',
      width: 150,
    },
  
    profile: {
      alignSelf: 'flex-end',
      
    },
  
    container: {
      flex: 1,
    },
  
    column: {
      flex: 1,
    },
  
    plantName: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  
    scientificName: {
      fontStyle: 'italic',
      fontSize: 15,
    },
  
    plantIcons: {
      alignSelf: 'center',
      width: horizontal * .39,
      height: vertical * 0.26,
      
    },
    
    box: {
      backgroundColor: '#fff',
      borderRadius: 11,
      borderWidth: 2,
      flex: 1,
      borderColor: '#CFCDCD',
      width: horizontal * .4,
      height: vertical * 0.26,
      margin: 10,
      justifyContent: 'center',
    }
  })