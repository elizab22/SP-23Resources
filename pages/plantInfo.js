import { Modal, Text, View, Image, Pressable, StyleSheet, Dimensions,
    TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
    
    const horizontal = Dimensions.get('window').width;
    const vertical = Dimensions.get('window').height;
    
    export default function ShowModal ({prop, modalVisible, close}) {
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
                    <Pressable 
                        style={styles.closeContainer}
                        onPress={() => close()}>
                        <Text style={styles.close}>X</Text>
                      </Pressable>
                    <ImageBackground 
                      source={prop.image}
                      style={styles.plantImage}
                      resizeMode='cover'>
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
                          <Text style={{fontSize: 20, color: '#fff'}}>
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
    
    const styles = StyleSheet.create({
      closeContainer: {
        height: 20,
      },
      close: {
        alignSelf: 'flex-end',
        fontSize: 20,
        borderRadius: 11,
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
        fontSize: 20,
      },
    
      scientificName: {
        fontStyle: 'italic',
        fontSize: 15,
      },
    })