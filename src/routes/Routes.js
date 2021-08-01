import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeRoute from './HomeRoutes';
import SupportRoutes from './SupportRoutes';

const RootStack = createStackNavigator();

export default function Routes() {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen
        name="The Expensor"
        component={HomeRoute}
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
      <RootStack.Screen name="support" component={SupportRoutes} />
    </RootStack.Navigator>
  );
}
