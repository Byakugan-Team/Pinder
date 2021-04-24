import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PetsDashboard from './components/PetsDashboard'

export default function App() {
  return (

    <PetsDashboard/>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#22afc3'
  },
});

