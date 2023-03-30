import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const Title = () => {
  const [loaded] = useFonts({
    OrbitronRegular: require('../assets/fonts/Orbitron-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={{fontFamily: 'Orbitron-Regular', fontSize: 32}}>PLANIT</Text>;
};

export default Title;