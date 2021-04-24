
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import photoMatching from '../assets/menu-matching.png'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#5EC2E0',
      activeBackgroundColor:'white',
      
      keyboardHidesTabBar:true,
      labelPosition:'below-icon'
    }}>
            <Tab.Screen name="Offers" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="offer" color={color} size={size} />
                )
              }}
            />


      <Tab.Screen name="Matching" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="heart-plus" color={color} size={size} />
                )
              }}/>

             <Tab.Screen name="My Account" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                )
              }}/>
    </Tab.Navigator>
  );
}

export default function Globalmenu() {
  return (
    <NavigationContainer>
    <MyTabs />
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
