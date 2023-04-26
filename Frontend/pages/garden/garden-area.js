import { View, TouchableOpacity, Text, Image, StyleSheet, Animated } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useState, useRef } from "react";
import { Grid, Row, Col } from "react-native-easy-grid";

// return a view that links ref from props to this view
// used to measure garden size changes
export default function GardenArea(props) {
    return (
            <View ref={props.gardenRef} onLayout={props.onLayout} style={[styles.gardenBox, {width: props.width, height: props.height}]}></View>
    );
    
}

const styles = EStyleSheet.create({
    gardenBox: {
        backgroundColor: "#9E9C9C",
        borderRadius: "10"
    },

})
