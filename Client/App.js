import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Globalmenu from './components/Globalmenu'
import PhoneNumber from './components/Phone_Number_Verification/Chek_Phone_Number&Send_Code'
import LoginScreen from './components/LoginScreen'
import CheckVerification from './components/Phone_Number_Verification/Chek_Verification_Code'


export default function App() {
  return (
    <View style={styles.container}>
    <CheckVerification/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#22afc3'
  },
});

