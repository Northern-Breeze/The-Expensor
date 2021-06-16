import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';

const RootDrawer = createDrawerNavigator();

export default function HomeRoutes() {
  return (
    <RootDrawer.Navigator>
      <RootDrawer.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="md-home"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
    </RootDrawer.Navigator>
  );
}
