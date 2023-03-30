import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/authentication/login';
import Landing from './pages/landing';
import Garden from './pages/garden/garden';
import NumPlants from './pages/authentication/num-plants';
import Recommender from './pages/recommender';
import Search from './pages/search';
import FirstPrompt from './pages/authentication/question-one';
import Location from './pages/garden/location';
import Plants from './pages/plants';
import EStyleSheet from 'react-native-extended-stylesheet';
import Register from './pages/authentication/register';
import Dashboard from './pages/dashboard';

const Stack = createNativeStackNavigator();

export default function App() {
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
