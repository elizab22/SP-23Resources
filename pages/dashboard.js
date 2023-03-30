import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Back from './back';
import Header from './components/header';
import EStyleSheet from 'react-native-extended-stylesheet';


export default function Dashboard({ navigation }) {
    return (
        <View>
            <Header />
            <Text>HOME PAGE</Text>
        </View>
    )
}

