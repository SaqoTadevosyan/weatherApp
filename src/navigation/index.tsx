import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import History from '../screens/History';
const MainStack = createStackNavigator();
export const Navigation = () => (
  <MainStack.Navigator screenOptions={{headerShown: false}}>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="History" component={History} />
  </MainStack.Navigator>
);
