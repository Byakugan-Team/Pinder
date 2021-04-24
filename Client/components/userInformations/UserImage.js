import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View,Image,Button } from 'react-native';
export default function Photo(props) {
  const [localUri,setSelectedImage]=useState('')
  const [data,setPhoto]=useState('')

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    let data = {
      "file": pickerResult.uri,
      "upload_preset": "kgiezron",
    }

    fetch("https://api.cloudinary.com/v1_1/dm1xlu8ce/image/upload", {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
console.log(data,'hhhhhhhhh')
      setPhoto(data.url);
    }).catch(err => console.log(err))
  };
 
  return (
    <View>
      {console.log(data,'rrrrrr')}
      <Text> Look at our pretty picture! </Text>
      <Button theme={theme} title='file' mode="contained" onPress={() => openImagePickerAsync()} />
      <Image style={styles.img} source={{uri:data}}/>

</View>
  );
}
const theme = {colors:{primary:"#CA9D0C"}};
const styles = StyleSheet.create({
  img:{
    width:30,
    height:20
  }
})