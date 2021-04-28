import React from 'react';
import { StyleSheet, Text  } from 'react-native';

export const MyText = props => <Text style={styles.text, props.style} onPress={props.onPress}>{props.children}</Text>

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat, sans-serif",
  }
});