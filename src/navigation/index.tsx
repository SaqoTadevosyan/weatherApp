import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import History from '../screens/History';
import {HistoryIcon, HomeIcon} from '../icons/Home';
const MainStack = createBottomTabNavigator();
export const Navigation = () => (
  <MainStack.Navigator
    screenOptions={({route}) => {
      return {
        headerShown: false,
        tabBarIcon: ({focused}) => {
          if (route.name === 'Home') {
            return <HomeIcon color={focused ? '#567DF4' : '#E5E5E5'} />;
          } else {
            return <HistoryIcon color={focused ? '#567DF4' : '#E5E5E5'} />;
          }
        },
      };
    }}>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="History" component={History} />
  </MainStack.Navigator>
);
