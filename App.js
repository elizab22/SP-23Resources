import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/login';
import Landing from './pages/landing';
import Garden from './pages/garden';
import FirstPrompt from './pages/question-one';
import Plants from './pages/plants';

const Stack = createNativeStackNavigator();

export default function App() {
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
          name="Garden"
          component={Garden}
        />
        <Stack.Screen
          name="Plants"
          component={Plants}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
