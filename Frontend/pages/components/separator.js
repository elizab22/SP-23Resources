import { StyleSheet, View, Dimensions } from 'react-native';

const horizontal = Dimensions.get('window').width;

export default function Separator() {
  return (
    <View style={styles.rule}></View>
  );
}

const styles = StyleSheet.create({
  rule: {
    margin: 10,
    height: 2,
    backgroundColor: '#000000',
    width: horizontal - 80,
  }
})