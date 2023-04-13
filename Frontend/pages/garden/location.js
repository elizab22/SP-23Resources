import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import Header from "../components/header";
import Back from "../back";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function Location({ navigation }) {
    const [name, setName] = useState("");
    const [width, setWidth] = useState(0);
    const [length, setLength] = useState(0);
    const [imageAssets, setImageAssets] = useState(null);

    const onSubmit = () => {
        if (
            name != "" &&
            width != "" &&
            length != "" &&
            !isNaN(width) &&
            !isNaN(length)
        ) {
            navigation.navigate("AddPlants", {
                width: parseInt(width),
                length: parseInt(length),
                name: name,
                imageAssets: imageAssets,
            });
        } else {
            alert("Please fill out all fields correctly");
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 1],
            quality: 1,
        });
        if (result.assets != null) {
            setImageAssets(result.assets);
        }
    };

    const emptyImage = (
        <TouchableOpacity style={styles.emptyImage} onPress={pickImage}>
            <Text style={styles.emptyImageText}>
                Click here to add an image
            </Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <Header />
            <Back navigation={navigation} />
            <View style={styles.box}>
                <TextInput
                    style={styles.title}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter Garden Name"
                    value={name}
                ></TextInput>

                {imageAssets ? (
                    <TouchableOpacity
                        style={styles.gardenImageButton}
                        onPress={pickImage}
                    >
                        <Image
                            style={styles.gardenImage}
                            source={{ uri: imageAssets[0].uri }}
                        ></Image>
                        <TouchableOpacity onPress={() => setImageAssets(null)}>
                            <Text style={{ marginTop: 5 }}>Remove Image</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ) : (
                    emptyImage
                )}

                <Text>Size of your garden</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Width in feet"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                    onChangeText={(text) => setWidth(text)}
                    value={width}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Length in feet"
                    placeholderTextColor="#000"
                    keyboardType="numeric"
                    onChangeText={(text) => setLength(text)}
                    value={length}
                />
            </View>
            <TouchableOpacity style={{}} onPress={onSubmit}>
                <Text style={{ textAlign: "center", marginTop: 10 }}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        margin: 30,
    },

    emptyImage: {
        width: 250,
        height: 100,
        backgroundColor: "#c9c9c9",
        marginBottom: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyImageText: {
        color: "#696969",
    },

    gardenImage: {
        width: 250,
        height: 100,
        borderRadius: 10,
    },

    gardenImageButton: {
        marginBottom: 50,
    },

    input: {
        width: 247,
        borderWidth: 1,
        height: 41,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        textAlign: "center",
    },

    box: {
        borderWidth: 1,
        alignItems: "center",
        // justifyContent: 'center',
        borderRadius: 25,
        marginHorizontal: 40,
        height: 500,
    },

    title: {
        fontSize: 25,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 75,
    },
});
