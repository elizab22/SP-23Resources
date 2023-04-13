import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    ScrollView,
} from "react-native";
import Header from "../components/header";
import EStyleSheet from "react-native-extended-stylesheet";
import { useEffect, useRef, useState } from "react";
import Back from "../components/back";
import PlantInventory from "./plant-inventory";
import { Grid, Row, Col } from "react-native-easy-grid";
import GardenArea from "./garden-area";
import { measure, measureInWindow } from "react-native-reanimated";
import { createRef } from "react";
import Slider from "@react-native-community/slider";
import { Dimensions } from "react-native";
import { savePlantsToGarden } from "../../src/database";
import { getGarden } from "../../src/database";

export default function Garden(props) {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);
    const [xPos, setX] = useState(0);
    const [yPos, setY] = useState(0);
    const [plants, setPlants] = useState({});
    const [name, setName] = useState("");
    const [gardenData, setGardenData] = useState({});
    const gardenRef = useRef(null);


    const [images, setImages] = useState([["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Tagetes_erecta_chendumalli_chedi.jpg/1200px-Tagetes_erecta_chendumalli_chedi.jpg"],
    ["https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/pink%20lilies-Anastasios71-SS.jpeg?itok=mmh-o8yf"]]);


    

    useEffect(() => {
        const tempFunc = async () => {
            const garden = await getGarden(props.route.params.id)
            setName(garden.name);
            setWidth(garden.width * 48);
            setHeight(garden.length * 48);
            setGardenData(garden);
        }
        tempFunc();
    }, [])


    const isInGarden = (x, y) => {
        if (
            x > xPos &&
            x + 55 < xPos + width &&
            y + 55 > yPos &&
            y < yPos + height
        ) {
            return true;
        }
        return false;
    };

    const measureGarden = () => {
        gardenRef.current.measure((x, y, width, height, pageX, pageY) => {
            setX(pageX);
            setY(pageY);
        });
    };
    
    const saveGarden = () => {
        const widthFt = Math.round(width / 48)
        const heightFt = Math.round(height / 48)
        savePlantsToGarden(props.route.params.id, plants, widthFt, heightFt);
    }

    const updatePlants = (id, x, y, inGarden) => {
        setPlants(old => {
            if (inGarden) {
                old[id] = {x: x, y: y}
            } else {
                old[id] = {x: 0, y: 0}
            }
            return old
        })
    }

    return (
        <View style={styles.outerShell}>
            <Header />
            <Back navigation={props.navigation} onBack={saveGarden} />
            <Grid style={styles.container}>
                <Text style={styles.gardenTitle}>{name + ": " + Math.round(width / 48) + "\' x " + Math.round(height / 48) + "\'"}</Text>
                <View style={{ alignItems: "stretch" }}></View>
                <Row size={3}>
                    <GardenArea
                        gardenRef={gardenRef}
                        onLayout={(event) => {
                            measureGarden();
                        }}
                        width={width}
                        height={height}
                    ></GardenArea>
                </Row>
                <View style={styles.sizeControlView}>
                    <Text style={styles.dimensionText}>Width: </Text>
                    <Slider
                        minimumValue={60}
                        step={48}
                        maximumValue={Dimensions.get("window").width}
                        value={width}
                        style={styles.sliderStyle}
                        onValueChange={(value) => setWidth(value)}
                        minimumTrackTintColor=""
                    ></Slider>
                    <Text style={styles.dimensionText}>Length: </Text>
                    <Slider
                        minimumValue={60}
                        maximumValue={350}
                        step={48}
                        value={height}
                        style={styles.sliderStyle}
                        onValueChange={(value) => setHeight(value)}
                    ></Slider>
                </View>
                <Row size={2}>
                    <PlantInventory gardenData={gardenData} updatePlants={updatePlants} images={images} gardenWidth={width} gardenHeight={height} isInGarden={isInGarden}></PlantInventory>
                </Row>
            </Grid>
        </View>
    );
}

const styles = EStyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },

    sizeControlView: {
        flexDirection: "row",
        alignItems: "center",
        height: "auto"
    },

    sliderStyle: {
        width: "30%",
    },

    dimensionText: {
        marginRight: ".5rem",
        marginLeft: ".5rem",
        fontSize: "1rem"
    },

    outerShell: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    gardenTitle: {
        marginTop: "-2.3rem",
        marginBottom: "2.3rem",
        fontSize: "1.3rem",
    },

    plantInv: {
        marginTop: 100,
    },
});
