import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Routes
import HomeRoute from './HomeRoutes';
import SupportRoutes from './SupportRoutes';

const TabNav = createMaterialTopTabNavigator();

const TabScreen = () => {
  return (
    <TabNav.Navigator>
      <TabNav.Screen name="Home" component={HomeRoute} />
      <TabNav.Screen name="Support" component={SupportRoutes} />
    </TabNav.Navigator>
  );
};

const RootStack = createStackNavigator();
export default function Routes() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="The Expensor"
        component={TabScreen}
        options={{
          headerTransparent: {
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
          },
        }}
      />
    </RootStack.Navigator>
  );
}
