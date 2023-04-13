import {
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import Tab from './tab';

export default function Menu({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
                style={styles.menu}
                source={require('../../../assets/images/menu-icon.png')} />
            <Tab
                navigation={navigation}
                username='user'
                visibility={modalVisible}
                close={() => setModalVisible(false)}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menu: {
        width: 45,
        height: 45,
      }, 
})