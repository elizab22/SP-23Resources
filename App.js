import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/login';
import Landing from './pages/landing';
import Garden from './pages/garden';
import NumPlants from './pages/num-plants';
import Recommender from './pages/recommender';
import Search from './pages/search';
import FirstPrompt from './pages/question-one';
import Location from './pages/location';
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
          name="Location"
          component={Location}
        />
        <Stack.Screen
          name="NumPlants"
          component={NumPlants}
        />
        <Stack.Screen
          name="Search"
          component={Search}
        />
        <Stack.Screen
          name="Garden"
          component={Garden}
        />
        <Stack.Screen
          name="AddPlants"
          component={Plants}
        />
        <Stack.Screen
          name="Recommender"
          component={Recommender}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
