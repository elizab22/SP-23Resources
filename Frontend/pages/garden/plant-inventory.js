import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import Header from "../components/header";
import EStyleSheet from "react-native-extended-stylesheet";
import PlantIcon from "./plant-icon";
import { useEffect, useState, useRef } from "react";
import { Grid, Row, Col } from "react-native-easy-grid";

export default function PlantInventory(props) {

    let imagesObj = useRef({});
    useEffect(() => {
        for (let i = 0; i < props.images.length; i++) {
            imagesObj[props.images[i][0]] = i;
        }
    }, []);

    const emptyCell = <Col>
            <View style={styles.emptyImage}></View>
    </Col>

    const addPlantsButton = <Col>
        <TouchableOpacity style={styles.emptyImage} onPress={() => props.navigation.navigate("AddPlants", {gardenId: props.gardenData.id})}>
            <Image style={styles.addButton} source={require("../assets/add.png")}></Image>
        </TouchableOpacity>
    </Col>

    const createRow = (start, end) => {
        let row = []
        let count = 0;
        for (let i = start; i < end; i++) {
                if (props.gardenData.plants && props.gardenData.plants[i]) {
                    row.push(props.images[i] ? <Col><PlantIcon gardenData={props.gardenData} oldX={props.gardenData.plants[i].x_value} oldY={props.gardenData.plants[i].y_value} size={"medium"} updatePlants={props.updatePlants} id={props.gardenData.plants[i].plant_id} gardenHeight={props.gardenHeight} gardenWidth={props.gardenWidth} url={props.images[i]} key={count} isInGarden={props.isInGarden} /></Col> : emptyCell);
                } else if (i > 0 && props.images[i-1] && !props.images[i]) { 
                    row.push(addPlantsButton);
                } else {
                    row.push(props.images[i] ? <Col><PlantIcon gardenData={props.gardenData} oldX={0} oldY={0} size={"medium"} updatePlants={props.updatePlants} id={count} gardenHeight={props.gardenHeight} gardenWidth={props.gardenWidth} url={props.images[i]} key={count} isInGarden={props.isInGarden} /></Col> : emptyCell);
                }
                count++;
            } 
        return row
    }

    const createEmptyRow = num => {
        let row = []
        for (let i = 0; i < num; i++) {
            row.push(emptyCell);
        }
    }

    return (
        <Grid style={styles.grid}>
            <Row>
               {Object.keys(props.gardenData).length !== 0 ? createRow(0, 5) : createEmptyRow(5)}
            </Row>
            <Row>
                {createRow(5, 10)}
            </Row>
            <Row>
                {createRow(10, 15)}
            </Row>
        </Grid>
    );
}

const styles = EStyleSheet.create({
    grid: {
        backgroundColor: "#637763",
        padding: "1.5rem",
        alignItems: "center"
    },

    emptyImage: {
        width: 55, 
        height: 55,
        borderRadius: 27,
        backgroundColor: "white"
        // borderWidth: ".1rem",
        // borderColor: "white"
    },

    addButton: {
        width: 55, 
        height: 55,
        borderRadius: 27,
    }
});
