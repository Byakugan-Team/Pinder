import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen'
import PhoneNumber from './components/Phone_Number_Verification/Chek_Phone_Number&Send_Code'
import CheckVerification from './components/Phone_Number_Verification/Chek_Verification_Code'
import UselessTextInput from './components/userInformations/UserFullname'
import openImagePickerAsync from './components/userInformations/UserImage'
import PetsDashboard from './components/petsDashboard/PetsDashboard'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserImage from './components/userInformations/UserImage';
import Chat from './components/Message/Chat_Screen'
import UserUpdateInfo from './components/userInformations/UserUpdateInfo';
import UpdatePetInfo from './components/UpdatePetInfo';

import Notification from './components/Notification';
import PetsScreen from './components/petsDashboard/PetScreen'
import Globalmenu from './components/Globalmenu'
import MessagesList from './components/Message/Messages_List_Screen'
import Matching from './components/Matching'

import Friends from './components/Friends'
//import ProfileView from './components/Profile_View.js/Profile'
import ProfileView from './components/Profile_View.js/Profile';
import Notification2 from './components/Notification2';

const Stack = createStackNavigator();

export default function App() {

  return (
    
      <NavigationContainer   styles={{backgroundColor:'white'}} >
        <Stack.Navigator headerMode='none' >
       
        <Stack.Screen 
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen 
            name="Friends"
            component={Friends}
          />
          <Stack.Screen 
            name="ProfileView"
            component={ProfileView}
          />
           <Stack.Screen 
            name="Notification"
            component={Notification}
          />
        <Stack.Screen
            name="UserImage"
            component={UserImage}
          />
        <Stack.Screen
            name="PetsDashboard"
            component={PetsDashboard}
          />   
        <Stack.Screen 
            name="Matching"
            component={Matching}
          />

<Stack.Screen 
            name="Globalmenu"
            component={Globalmenu}
            independent={true}
          /> 

        
       
 {/* <Stack.Screen 
            name="ProfileView"
            component={ProfileView}
          />  */}
        
        <Stack.Screen 
            name="petUpdate"
            component={UpdatePetInfo}
            name="chatScreen"
            component={Chat}
          /> 
        

    <Stack.Screen 
            name="PetScreen"
            component={PetsScreen}
          />
         
            
           
       
          <Stack.Screen
            name="CheckVerification"
            component={CheckVerification}
            options={{
              cardStyle: {
                backgroundColor: 'white',
              }}
            }
          />
          <Stack.Screen
            name="UselessTextInput"
            component={UselessTextInput}
            options={{
              cardStyle: {
                backgroundColor: 'white',
              }}
            }
          />
          <Stack.Screen
            name="PhoneNumber"
            component={PhoneNumber}
            options={{
              cardStyle: {
                backgroundColor: 'white',
              }}
            }
          />
  <Stack.Screen
            name="openImagePickerAsync"
            component={openImagePickerAsync}
          />
        
        </Stack.Navigator>
      </NavigationContainer>

  );
}
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
    // backgroundColor: '#22afc3'
  // },
});

