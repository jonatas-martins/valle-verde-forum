// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CreateTopicScreen from './src/screens/CreateTopicScreen';
import CommentScreen from './src/screens/CommentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Forum" component={HomeScreen} />
        <Stack.Screen name="Topicos" component={CreateTopicScreen} />
        <Stack.Screen name="Comentarios" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
