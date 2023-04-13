import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Frontend/pages/authentication/login';
import Landing from './Frontend/pages/landing';
import Garden from './Frontend/pages/garden/garden';
import FirstPrompt from './Frontend/pages/authentication/question-one';
import NewGarden from './Frontend/pages/garden/newGarden';
import Plants from './Frontend/pages/plants';
import EStyleSheet from 'react-native-extended-stylesheet';
import Register from './Frontend/pages/authentication/register';
import Dashboard from './Frontend/pages/dashboard';
import { useEffect } from './src/api-calls'

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    init();
  }, [])
  
  EStyleSheet.build({})
  return (
<NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' }
    }}>
        <Stack.Screen
          name="Landing"
          component={Landing}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="FirstPrompt"
          component={FirstPrompt}
        />
        <Stack.Screen
          name="NewGarden"
          component={NewGarden}
        />
        <Stack.Screen
          name="Garden"
          component={Garden}
        />
        <Stack.Screen
          name="Plants"
          component={Plants}
        />
        <Stack.Screen
          name="Register"
          component={Register}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
