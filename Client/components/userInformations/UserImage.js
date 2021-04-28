import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, Button, Platform } from 'react-native';
import server_IP from '../../config/Server_IP'

export default function Photo({navigation,route}) {
	const [ localUri, setSelectedImage ] = useState('');
	const [ data, setPhoto ] = useState((route.params.photo) ? route.params.photo : '');

	const _storeData = async (token) => {
		try {
		  await AsyncStorage.setItem(
			'Pinder_token',
			token
		  );
		} catch (error) {
		  console.log(error)
		}
	  };

	const openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [ 4, 3 ],
			base64: true
		});

		if (pickerResult.cancelled === true) {
			return;
		}

		setSelectedImage({ localUri: pickerResult.uri });

		if(Platform.OS== 'android'){
			var data = {
				file: 'data:image/jpeg;base64,' + pickerResult.base64,
				upload_preset: 'kgiezron'
			};
		}else{
			var data = {
				file: pickerResult.uri,
				upload_preset: 'kgiezron'
			};
		}

		fetch('https://api.cloudinary.com/v1_1/dm1xlu8ce/image/upload', {
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(async (r) => {
				let data = await r.json();
				setPhoto(data.url);
			})
			.catch((err) => console.log(err));
	};
	const CreateUser = ()=>{
		var user = {
			firstname:route.params.firstname,
			lastname:route.params.lastnmae,
			number:route.params.number,
			email:route.params.email,
			photo:data
		}
		fetch('http://'+server_IP+':3000/users', {
			body: JSON.stringify(user),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(async (r) => {
				let data = await r.json();
				console.log(data)
				if(data.registred){
					_storeData(data.token)
				navigation.navigate('PetsDashboard')
				}
			})
			.catch((err) => console.log(err));
		
	}
	
	return (
		<View>
			<Text style={styles.addImg}>Add Photo </Text>
			<Image style={styles.img} source={{ uri: data }} />
			<View style={styles.btnImg}>
				<Button theme={theme} title="file" mode="contained" onPress={() => openImagePickerAsync()} />
			</View>
			<View style={styles.btn}>
				<Button title="Continue" onPress={()=>CreateUser()}/>
			</View>
		</View>
	);
}
const theme = { colors: { primary: '#CA9D0C' } };
const styles = StyleSheet.create({
	img: {
		width: 200,
		height: 300,
		backgroundColor: '#e4e4ee',
		resizeMode: 'cover',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		left: 60,
		opacity: 10,
		bottom: -50
	},
	btnImg: {
		marginBottom: 20,
		padding: 50,
		bottom: -5,
		textAlign: 'center'
	},
	addImg: {
		top: 10,
		paddingLeft: 10,
		fontWeight: 'bold',
		fontSize: 40,
		width: 355
	},
	btn: {
		bottom: -50,
		height: 60,
		borderRadius: 20
	}
});
