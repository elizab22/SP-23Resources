import {
    Modal,
    Text,
    View,
    Image,
    Pressable,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    FlatList,
    Button
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";

import { useEffect, useState } from "react";
import { getUserGardens, addPlantsToGarden } from "../src/database";

const horizontal = Dimensions.get("window").width;
const vertical = Dimensions.get("window").height;

export default function MyPlantsModal(props) {

    const [currentPlants, setCurrentPlants] = useState(props.data);
    const [isSeeingPlants, setIsSeeingPlants] = useState(true);
    const [chosenGarden, setChosenGarden] = useState(null);
    const [userGardens, setUserGardens] = useState([]);
    const [pickerOpen, setPickerOpen] = useState(false);

    // get user gardens and format it for the dropdown picker in confirm modal
    useEffect(() => {
        const tempFunc = async () => {
            const gardens = await getUserGardens();
            const obj = gardens.map(garden => {
                return {
                    label: garden.name,
                    value: garden.id
                }
                })
            setUserGardens(obj);
            }
        tempFunc();
    }, [])

    // delete a plant from plant inventory
    const deletePlant = (name) => {
        setCurrentPlants(oldPlants => {
            return oldPlants.filter(item => name !== item.name)
        })
    }

    const addPlants = async () => {
        if (props.gardenId) {
            await savePlants();
        } else {
            setIsSeeingPlants(false);
        }
    }

    // save plants to selected garden
    const savePlants = async () => {
        let plantObj = {}
        currentPlants.map(plant => {
            plantObj[plant.id] = {x: 0, y: 0}
        }),
        console.log(plantObj)
        if (chosenGarden) {
            await addPlantsToGarden(chosenGarden, plantObj)
        } else {
            await addPlantsToGarden(props.gardenId, plantObj)
        }
        props.addedPlants()
    }


    // display the plant inventory or the garden picker confirm screen based on what state the 
    // page is in. First the plant inventory is shown, and once the user clicks confirm it 
    // navigates to the pick garden screen.
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.saveCurrentPlants(currentPlants);
                props.close();
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable
                        style={styles.closeContainer}
                        onPress={() => {
                            props.saveCurrentPlants(currentPlants);
                            props.close()
                        }}
                    >
                        <Text style={styles.close}>X</Text>
                    </Pressable>
                    {isSeeingPlants ? currentPlants.length > 0 ? 
                    <FlatList
                        directionalLockEnabled={true}
                        data={currentPlants}
                        style={styles.column}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <View
                                    style={{ alignItems: "center", margin: 10 }}
                                >
                                <View>
                                        <Image
                                            style={styles.plantIcons}
                                            src={item.image}
                                            resizeMode="cover"
                                        ></Image>
                                </View>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.plantName}
                                    >
                                        {item.name}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.scientificName}
                                    >
                                        {item.scientificName}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => deletePlant(item.name)}>
                                    <Image style={styles.trashIcon} source={require("../../assets/images/trash.png")}></Image>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={1}
                    /> : <Text style={styles.noPlantsText}>You have no plants added yet!</Text> : 
                    <View>
                        <TouchableOpacity onPress={() => setIsSeeingPlants(true)} style={styles.backContainer}>
                            <Image source={require('../../assets/images/left.png')}
                            />
                            <Text style={styles.backText}>  Back</Text>
                        </TouchableOpacity>
                        <View><Text style={styles.chooseGardenText}>Choose a garden</Text></View>
                        <DropDownPicker
                            value={chosenGarden}
                            items={userGardens}
                            setItems={setUserGardens}
                            setValue={setChosenGarden}
                            multiple={false}
                            open={pickerOpen}
                            setOpen={setPickerOpen}
                        />

                        {chosenGarden ? <TouchableOpacity style={styles.addButton} onPress={() => savePlants()}>
                                <Text style={styles.confirmText}>Add Plants</Text>
                            </TouchableOpacity> : <View/>}
                
                    </View>
                        }
                    {currentPlants.length > 0 && isSeeingPlants ? <TouchableOpacity style={styles.confirmButton} onPress={addPlants}>
                                <Text style={styles.confirmText}>Confirm Plants</Text>
                            </TouchableOpacity> : <View></View>}
                            
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

    chooseGardenText: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 15,
        marginBottom: 20
    },

    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        marginBottom: 20,
      },

    backText: {
        fontSize: 17,
      },

    confirmButton: {
        alignItems: "center",
        backgroundColor: "#AFC6B8",
        borderRadius: 12,
        height: 50,
        marginHorizontal: 55 ,
        justifyContent: "center"
    },

    addButton: {
        marginTop: 50,
        alignItems: "center",
        backgroundColor: "#AFC6B8",
        borderRadius: 12,
        height: 50,
        marginHorizontal: 55 ,
        justifyContent: "center"
    },


    confirmText: {
        fontSize: 20,
        color: "#366652"
    },

    noPlantsText: {
        fontSize: 30,
        textAlign: "center",
        marginTop: 30
    },

    closeContainer: {
        height: 20,
    },

    close: {
        alignSelf: "flex-end",
        fontSize: 20,
        borderRadius: 11,
    },

    plantImage: {
        height: 300,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        width: horizontal,
        height: vertical * 0.9,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    attrView: {
        flexDirection: "row",
        marginTop: 10,
    },

    buttonOne: {
        borderRadius: 11,
        width: 170,
        height: 40,
        backgroundColor: "#637763",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
    },

    buttonTwo: {
        borderRadius: 11,
        width: 50,
        height: 40,
        backgroundColor: "#637763",
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
    },

    middleSection: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 20,
        marginTop: 20,
    },

    plantName: {
        fontSize: 20,
        textAlign: "right"
    },

    scientificName: {
        fontStyle: "italic",
        fontSize: 15,
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
        alignSelf: 'flex-start',
        marginLeft: 0,  
        width: 250,
        height: 100,
        marginBottom: 10,
        borderRadius: 11
      },

      trashIcon: {
        marginTop: 30,
        width: 50, 
        height: 50, 
        tintColor: "red"
      },
      
      box: {
        backgroundColor: '#fff',
        flex: 1,
        width: 250,
        height: 200,
        justifyContent: 'flex-start',
        flexDirection: "row"
      }
});
