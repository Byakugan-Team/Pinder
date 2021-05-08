
import React,{Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import photoMatching from '../assets/menu-matching.png'
import PetsDashboard from './petsDashboard/PetsDashboard'
import MessagesList from './Message/Messages_List_Screen'
import Matching from './Matching'
import Friends from './Friends'
import Icon from '../assets/Icon';
import * as Font from 'expo-font';
const Tab = createBottomTabNavigator();

function MyTabs({newRegistred}) {
  const navigation = useNavigation();
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#5EC2E0',
      activeBackgroundColor:'white',
      
      keyboardHidesTabBar:true,
      labelPosition:'below-icon'
    }}>
       <Tab.Screen name="Matching"  children={()=><Matching newRegistred={newRegistred} navigation={navigation}/>} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="heart-plus" color={color} size={size} />
                )
              }}/>
              <Tab.Screen name="Friends" component={Friends} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account-multiple" color={color} size={size} />
                )
              }}/>
            <Tab.Screen name="Chats" component={MessagesList} options={{
                tabBarIcon: ({ color, size }) => (
                  <Text style={{fontFamily:'tinderclone',color:color,fontSize:size}}>
                  <Icon name="chat" />
                </Text>
                )
              }}
            />
 <Tab.Screen name="Notifications" component={PetsDashboard} options={{
   
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={size} />
                )
              }}
            />

     

             <Tab.Screen name="My Account" component={PetsDashboard} options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                )
              }}/>
    </Tab.Navigator>
  );
}


export default class Globalmenu extends Component {
  state = {
    fontsLoaded:false
  }
  componentDidMount(){
    Font.loadAsync( {
        'tinderclone': require('../assets/fontFamily/tinderclone.ttf')
    }
    ).then( () => this.setState( { fontsLoaded: true } ) )
  }
  render(){

    if(this.state.fontsLoaded){
      return (

        <MyTabs newRegistred = {(this.props.route.params && this.props.route.params.newRegistred) ? this.props.route.params.newRegistred : false}/>
    
      );
    }
    return <View></View>
    
  }
  
}

