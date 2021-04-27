import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen'
import PhoneNumber from './components/Phone_Number_Verification/Chek_Phone_Number&Send_Code'
import CheckVerification from './components/Phone_Number_Verification/Chek_Verification_Code'
import UselessTextInput from './components/userInformations/UserFullname'
import openImagePickerAsync from './components/userInformations/UserImage'
import PetsDashboard from './components/PetsDashboard'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserImage from './components/userInformations/UserImage';
import UserUpdateInfo from './components/userInformations/UserUpdateInfo';

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
            name="PetsImage"
            component={UserImage}
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
         <Stack.Screen
            name="PetsDashboard"
            component={PetsDashboard}
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

