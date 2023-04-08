import { FlatList, Text, StyleSheet, SafeAreaView, Image, ImageBackground, 
    Dimensions, View, Card, ScrollView,
    TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
    import React, { useState } from 'react';
    import {SearchBar} from 'react-native-elements';
    import PLANTS from './listPlants';
    
    
    const horizontal = Dimensions.get('window').width;
    const vertical = Dimensions.get('window').height;
    
    
    export default function Plants({navigation}) {
      const [modalVisible, setModalVisible] = useState(false);
      const [modalEntry, setModalEntry] = useState(0);
      const [search, setSearch] = useState("Search...");
    
    const[searchPlants, setSearchPlants] = useState(PLANTS);
    
    updateSearch = (search) => {
      setSearch({search});
      setSearchPlants(
      PLANTS.filter((plant) => 
        plant.name.toLowerCase().includes(search.split(" ").join("").toLowerCase())
      )
      );
    }
     
      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.top}>
          <ImageBackground
            style={styles.head}
            source={require('../assets/images/head.png')}>
            <TouchableOpacity>
              <Image
                style={styles.menu}
                source={require('../assets/images/menu-icon.png')}/>   
            </TouchableOpacity> 
            <View>
            <SearchBar
              lightTheme={true}
              containerStyle={styles.search}
              inputStyle={styles.search}
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
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={searchPlants}
            style={styles.column}
            renderItem={({item}) => (
              <View style={styles.boxContainer}>
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
    
    
    function ShowModal({prop, modalVisible, close}) {
      return (
        <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                  close();
                }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <ImageBackground 
                      source={prop.image}
                      style={styles.plantImage}
                      resizeMode='cover'>
                      <Pressable 
                        style={styles.close}
                        onPress={() => close()}>
                        <Text style={styles.close}>X</Text>
                      </Pressable>
                      </ImageBackground>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                          <Text 
                            style={styles.plantName}>
                            {prop.name}
                          </Text>
                          <Text 
                            style={styles.scientificName}>
                            {prop.scientificName}
                          </Text>
                        </View>
                        <View>
                          <Image source={require("../assets/images/like.png")}/>
                        </View>
                        <View>
                          <Image source={require("../assets/images/dislike.png")}/>
                        </View>
                      </View>
                      <View style={styles.middleSection}>
                        <TouchableOpacity style={styles.buttonOne}>
                          <Text style={{fontWeight: 'bold,', fontSize: 20}}>
                            Add to garden
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonTwo}>
                          <Image source={require('../assets/images/bookmark.png')}/>
                        </TouchableOpacity>
                      </View>
                      <ScrollView style={{paddingTop: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Description</Text>
                        <Text>{prop.description}</Text>
                      </ScrollView>
                    </View>
                  </View>
                </Modal>
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
        color: '#BED0BC',
        width: 150,
      },
    
      menu: {
        
      },
    
      profile: {
        alignSelf: 'flex-end',
        
      },
    
      container: {
        flex: 1,
      },
    
      column: {
        flex: 1,
        alignItems: 'center',
      },
    
      close: {
        alignSelf: 'flex-end',
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: '11',
      },
    
      plantImage: {
        height: 300,
        marginBottom: 10,
      },
    
     centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    
      modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        width: horizontal * 0.8,
        height: vertical * 0.8,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    
      buttonOne: {
        borderRadius: 11,
        width: 170,
        height: 40,
        backgroundColor:'#637763',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
      },
    
      buttonTwo: {
        borderRadius: 11,
        width: 50,
        height: 40,
        backgroundColor:'#637763',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
      },
    
      middleSection: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
      }
    })