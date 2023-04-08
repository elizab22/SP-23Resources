import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Header from './header';
import Back from './back';

export default function Location({ navigation }) {
    return (
        <View>
            <Header />
            <Back />
            <View
                style={styles.box}>
                <Text style={styles.title}>Garden 1</Text>
                <Text>Size of your garden</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Height in inches"
                    placeholderTextColor="#000"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Width in inches"
                    placeholderTextColor="#000"
                />
            </View>
            <TouchableOpacity style={{}} onPress={() => navigation.navigate('AddPlants')}>
                <Text style={{ textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    image: {
        margin: 30,
    },

    input: {
        width: 247,
        borderWidth: 1,
        height: 41,
        marginVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        textAlign: 'center',
    },

    box: {
        borderWidth: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 25,
        marginHorizontal: 40,
        height: 500,
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 120
    }
})