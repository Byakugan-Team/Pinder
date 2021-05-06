
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import photoMatching from '../assets/menu-matching.png'
import PetsDashboard from './petsDashboard/PetsDashboard'
import MessagesList from './Message/Messages_List_Screen'
import Matching from './Matching'
import ProfileView from './Profile_View.js/Profile'
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#5EC2E0',
      activeBackgroundColor:'white',
      
      keyboardHidesTabBar:true,
      labelPosition:'below-icon'
    }}>
       <Tab.Screen name="Matching" component={Matching} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="heart-plus" color={color} size={size} />
                )
              }}/>
            <Tab.Screen name="Chats" component={MessagesList} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="message" color={color} size={size} />
                )
              }}
            />
 <Tab.Screen name="notifications" component={PetsDashboard} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={size} />
                )
              }}
            />

     

             <Tab.Screen name="My Account" component={ProfileView} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                )
              }}/>
    </Tab.Navigator>
  );
}

export default function Globalmenu() {
  return (

    <MyTabs />

  );
}

const styles = StyleSheet.create({
  
});
