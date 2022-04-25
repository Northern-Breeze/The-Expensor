import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';

const RooStack = createStackNavigator();

export default function HomeRoutes() {
  return (
    <RooStack.Navigator headerMode="none">
      <RooStack.Screen name="Home" component={Home} />
    </RooStack.Navigator>
  );
}
