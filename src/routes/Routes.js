import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeRoute from './HomeRoutes';

const RootStack = createStackNavigator();

export default function Routes() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="The Expensor"
        component={HomeRoute}
        options={{}}
      />
    </RootStack.Navigator>
  );
}
