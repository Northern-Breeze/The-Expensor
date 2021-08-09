import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Support from '../screens/Support';

const SupportStack = createStackNavigator();

const SupportScreens = () => {
  return (
    <SupportStack.Navigator headerMode="none">
      <SupportStack.Screen name="support" component={Support} />
    </SupportStack.Navigator>
  );
};

export default SupportScreens;
