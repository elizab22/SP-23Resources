import { Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';


export default class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fontsLoaded: false
    }
  }

  componentDidMount() {
    this.loadFonts()
  }

  async loadFonts() {
    await Font.loadAsync({
      'BodoniModa_28pt-Regular': require('../../../assets/fonts/BodoniModa_28pt-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  

  render() {
    if (this.state.fontsLoaded) {
      return (
          <Text style={{ fontFamily: 'BodoniModa_28pt-Regular', fontSize: 40}}>PLANIT</Text>
      );
    } else {
      return null;
    }
  }
};
