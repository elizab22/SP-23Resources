import { FlatList, Text, StyleSheet, SafeAreaView, Image, ImageBackground, 
    Dimensions, View, Card, ScrollView,
    TouchableOpacity, Modal, Pressable, TextInput } from 'react-native';
    import React, { useState } from 'react';
    import {Button, SearchBar} from 'react-native-elements';
    import ShowModal from './plantInfo';
    import Filter from './filter';
    import Menu from './components/menu';
    import { searchPlants } from '../src/api-calls';
    import MyPlantsModal from './myPlantsModal';
    
    
    const horizontal = Dimensions.get('window').width;
    const vertical = Dimensions.get('window').height;
    
    
    export default function Plants(props) {
      const [modalVisible, setModalVisible] = useState(false);
      const [myPlantsModalVisible, setMyPlantsModalVisible] = useState(false); 
      const [modalEntry, setModalEntry] = useState(0);
      const [search, setSearch] = useState("");
      const [plants, setPlants] = useState([]);
      const [filter, setFilter] = useState({});
      const [gardenPlants, setGardenPlants] = useState([]);

      // update the filter state variable with the newFilter and call api again for search
      const updateFilter = async (newFilter) => {
        setFilter(newFilter);
        updateSearchResults(search, newFilter);
      }

      // save current plants to gardenPlants state
      const saveCurrentPlants = (currentPlants) => {
        setGardenPlants(currentPlants);
      }

      // add a plant to gardenPlants state variable
      const addPlant = item => {
        setGardenPlants(oldPlants => {
            oldPlants.push(item)
            return oldPlants
        })
      }
    
      // call api with all necessary filters / params and update search results with new
      // results
      const updateSearchResults = async (query, newFilter) => {
        const results = await searchPlants({...newFilter, query: query, isOnlyText: Object.keys(newFilter).length === 0 ? true : false});
        const newArr = results.results.map(result => {
          const sunExpo = result["Sun Exposure"].split("'").join("").split(",")[0].replace("[", "")
          const obj =  {
              description: result.Description,
              image: result.Image,
              scientificName: result["Scientific Name"],
              name: result.Name,
              id: result.Row,
              percentMatch: result["Percent Match"],
              sunExpo: newFilter.sun_expo ? newFilter.sun_expo : sunExpo,
              waterReq: result["Water Requirements"]
            }
            return obj;
        })
        setPlants(newArr)
      }
      
      // update the search text and call api to search plants again
      const updateSearch = async (search) => {
        setSearch(search);
        updateSearchResults(search, filter);
      }

      // on plants confirm, navigate back to the dashboard
      const addedPlants = () => {
        setMyPlantsModalVisible(false)
        props.navigation.goBack();
      }


      return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.top}>
          <ImageBackground
            style={styles.head}
            source={require('../../assets/images/head.png')}>
            <Menu navigation={props.navigation}/>
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
                source={require('../../assets/images/profile-icon.png')}/> 
            </TouchableOpacity> 
          </ImageBackground>
        </View>
        <View style={styles.aboveSearch}>
          <TouchableOpacity onPress={() => setMyPlantsModalVisible(true)}>
            <Text style={styles.seePlants}>See My Plants</Text>
          </TouchableOpacity>
          <Filter onFilterChange={updateFilter} />
        </View>
        <SafeAreaView style={styles.container}>
        {plants.length > 0 ? 
          <FlatList 
            directionalLockEnabled={true}
            data={plants}
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
                  <Image
                    style={styles.plantIcons}
                    src={item.image} resizeMode='cover'>
                  </Image>
                </TouchableOpacity>
                <Text numberOfLines={1} style={styles.plantName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.scientificName}>{item.scientificName}</Text>
                </View>
                <ShowModal
                  prop={modalEntry}
                  addPlant={addPlant}
                  modalVisible={modalVisible}
                  close={() => setModalVisible(false)}
                />  
                <MyPlantsModal 
                  gardenId={props.route.params.gardenId}
                  data={gardenPlants}
                  addedPlants={addedPlants}
                  navigation={props.navigation}
                  saveCurrentPlants={saveCurrentPlants}
                  modalVisible={myPlantsModalVisible}
                  close={() => setMyPlantsModalVisible(false)} />
              </View> 
            )}
            numColumns={2}
          /> : <Text style={styles.emptyText}>Use the filters or search bar to find plants!</Text>} 
        </SafeAreaView>
        </View>
      )
    }
    
    
    const styles= StyleSheet.create({
      emptyText: {
        fontSize: 25,
        textAlign: "center",
        margin: 20
      },

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

      aboveSearch: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    
      seePlants: {
        fontSize: 15,
        marginLeft: 20,
        marginTop: 12
      },

      column: {
        flex: 1,
      },
    
      plantName: {
        fontWeight: 'bold',
        fontSize: 20,
        maxWidth: 180
      },
    
      scientificName: {
        fontStyle: 'italic',
        fontSize: 15,
        maxWidth: 180

      },
    
      plantIcons: {
        alignSelf: 'center',
        width: horizontal * .39,
        height: vertical * 0.26,
        borderRadius: 11
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