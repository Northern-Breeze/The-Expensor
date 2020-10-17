import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeRoute from './HomeRoutes';

const RootStack =  createStackNavigator();

export default function Routes() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen 
                name="The Expensor"  
                component={HomeRoute}
                options={{
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                          name="md-home"
                          size={size}
                          color={focused ? '#7cc' : '#ccc'}
                        />
                      ),
                }}
                />
        </RootStack.Navigator>
    )
}
