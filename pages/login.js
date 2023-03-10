import { Text, TextInput, StyleSheet, Image, View, TouchableOpacity } from 'react-native';

export default function Login () {
  return (
    <View style={styles.container}>
      <Text>PLANIT GREEN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>New? Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'fff',
  },

  input: {
    width: '80%',
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  button: {
    width: '80%',
  },
})