import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useStoreState } from 'easy-peasy';
import HomeRoute from './HomeRoutes';

const RootStack =  createStackNavigator();

export default function Routes() {
    const currentBalance = useStoreState((state) => state.currentBalance)
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
                      headerRight: () => {
                          return (
                              <View style={{
                                  marginVertical: 10,
                                  marginHorizontal: 5
                              }}>
                                  <Text style={{
                                      fontWeight: 'bold',
                                      fontSize: 20
                                  }}>
                                    {`${currentBalance}`}
                                  </Text>
                              </View>
                          )
                      }
                }}
                />
        </RootStack.Navigator>
    )
}
