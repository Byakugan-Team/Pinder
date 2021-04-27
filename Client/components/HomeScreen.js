
import React from 'react';
import { StyleSheet,  View } from 'react-native';
import LoginScreen from './LoginScreen'


export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <LoginScreen navigation={navigation}>

            </LoginScreen>
            
        </View>

    )
}
const styles = StyleSheet.create({
    container: {

      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#22afc3'
    },
  });
  
  