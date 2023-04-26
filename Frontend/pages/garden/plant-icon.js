
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated, PanResponder } from "react-native";
import Header from "../components/header";
import EStyleSheet from "react-native-extended-stylesheet";
import { useState, useRef, useEffect } from "react";
import { Easing } from "react-native-reanimated";

export default function PlantIcon(props) {

    // state variables keeping track of plant icon position and if it's in the garden
    const [inGarden, setInGarden] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    // kept track of so that this component updates when the garden updates
    const [width, setWidth] = useState(55);
    const [height, setHeight] = useState(55);

    // used to make plant a square in the garden and circle in inventory area
    const [borderRadius, setBorderRadius] = useState(27);

    // change plant icon size based on its type
    const updateSize = () => {
        if (pan.x._value != 0 || pan.y._value != 0) {
            if (props.size === "large") {
                setWidth(100);
                setHeight(100);
                setBorderRadius(5);
            } else if (props.size === "medium") {
                setWidth(70);
                setHeight(70);
                setBorderRadius(5);
            } 
        }
    }

    // variable that keeps track of position of plant for animating
    const pan = useRef(new Animated.ValueXY()).current;

    // revert plant to its starting spot if it leaves the garden
    if (inGarden && !props.isInGarden(x, y)) {
        setInGarden(false);
        setWidth(55);
        setHeight(55);
        setBorderRadius(27);
        Animated.spring(pan, {toValue:{x:0,y:0}, useNativeDriver: false },  ).start(); 
    } 

    // create dragging animation functionality
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{ 
            dx : pan.x,
            dy : pan.y
        }], {useNativeDriver: false}),
        onPanResponderRelease        : (e, gesture) => {

            // update x and y pos
            setX(gesture.moveX);
            setY(gesture.moveY);

            // if plant is dragged into the garden, make it stay and update necessary info
            if (props.isInGarden(gesture.moveX, gesture.moveY)) {
                setInGarden(true);
                updateSize();
                props.updatePlants(props.id, pan.x._value, pan.y._value, true);

            // otherwise, put plant back to where it started in the inventory
            } else {
                setWidth(55);
                setHeight(55);
                setBorderRadius(27);
                Animated.spring(pan, {toValue:{x:0,y:0}, useNativeDriver: false },  ).start(); 
                props.updatePlants(props.id, 0, 0, false);
            }
        } 
    })

    // check if there are previously saved plants in the garden when loading from database, and
    // if so, put them in the garden where they used to be
    useEffect(
        () => {
            setTimeout(() => {                    
                setInGarden(true);
                Animated.timing(pan, {duration: 150, easing: Easing.linear, toValue: {x: props.oldX, y: props.oldY}, useNativeDriver: false }).start(
                    () => {
                        updateSize();
                        props.updatePlants(props.id, pan.x._value, pan.y._value, true);
                    }
                );
            }, 100)
        }, []
    )

    return <Animated.View style={[pan.getLayout(), styles.container]} 
            {...panResponder.panHandlers}>
        <Image style={[styles.image, {width: width, height: height, borderRadius: borderRadius}]} src={props.url}></Image>
    </Animated.View>
}

const styles = EStyleSheet.create({
    container: {
        width: 50,
        height: 50,
    },

    image: {
        // width: 55, 
        // height: 55,
        // borderRadius: 27,
        // borderWidth: ".1rem",
        // borderColor: "white"
    }

});