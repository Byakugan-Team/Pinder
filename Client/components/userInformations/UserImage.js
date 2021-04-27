import React, { useState, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function Photo({navigation,route}) {
	const [ localUri, setSelectedImage ] = useState('');
	const [ data, setPhoto ] = useState('');

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

		let data = {
			file: pickerResult.uri,
			upload_preset: 'kgiezron'
		};

		fetch('https://api.cloudinary.com/v1_1/dm1xlu8ce/image/upload', {
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
			.then(async (r) => {
				let data = await r.json();
				console.log(data, 'hhhhhhhhh');
				setPhoto(data.url);
			})
			.catch((err) => console.log(err));
	};
	console.log('first',route.params.firstname,' last',route.params.number)
	return (
		<View>
			{console.log(data, 'rrrrrr')}
			<Text style={styles.addImg}>Add Photo </Text>
			<Image style={styles.img} source={{ uri: data }} />
			<View style={styles.btnImg}>
				<Button theme={theme} title="file" mode="contained" onPress={() => openImagePickerAsync()} />
			</View>
			<View style={styles.btn}>
				<Button title="Continue" />
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
