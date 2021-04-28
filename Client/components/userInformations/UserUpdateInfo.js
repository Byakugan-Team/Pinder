import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import server_IP from '../../config/Server_IP'
// import { updateUser } from '../../../server/controllers/users'

const UserUpdateInfo = ({ navigation }) => {
	const [ e_mail, setEmail ] = useState('');
	const [ first, setFirst ] = useState('');
	const [ last, setLast ] = useState('');
	const [ biography, setBigraphy ] = useState('');
	const [ image, setImage ] = useState('');

	const userDetails = {
		e_mail: e_mail,
		first: first,
		last: last,
		biography: biography,
		image: image
	};

	// const [ number, onChangeNumber ] = React.useState();
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

		// setSelectedImage({ localUri: pickerResult.uri });

		if (Platform.OS == 'android') {
			var data = {
				file: 'data:image/jpeg;base64,' + pickerResult.base64,
				upload_preset: 'kgiezron'
			};
		} else {
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
		}).then(async (r) => {
			let data = await r.json();
			console.log(data.url, 'imageeee')
			setImage( data.url);
		});
	};
	const updateUser = (id) => {
		console.log(userDetails, 'hello')
		// id =1
		 axios.patch(`http://${server_IP}:3000/users/`+ id, 	{
			e_mail:e_mail,
			first:first,
			last:last,
			biography:biography,
			photo: image
		},
		{headers:{
			'Content-Type' : 'application/json',
		}}
				// {body: JSON.stringify(userDetails),
				// headers: {
				//     'content-type': 'application/json'
				// },
				// method: 'put',}
			)
			.then((res) => {
				console.log(res);
			}).catch ((err)=>{
				console.log(err, 'hiiii')
			})
	};

	return (
		<View style={{ textAlign: 'center' }}>
			<Text style={styles.fullName}>Update profile </Text>
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={setEmail} value={e_mail} placeholder="e-mail" />
				<TextInput style={styles.input} onChangeText={setFirst} value={first} placeholder="First Name" />
				<TextInput style={styles.input} onChangeText={setLast} value={last} placeholder="Last Name" />
				<TextInput style={styles.input} onChangeText={setBigraphy} value={biography} placeholder="biography" />
				<View style={styles.btnImg}>
					<Button title="Change Image" mode="contained" onPress={() => openImagePickerAsync()} />
				</View>
				<View style={styles.texty}>
					<Text>Here you can update your profile</Text>
					<Text>File the form </Text>
				</View>
			</View>
			<View style={styles.butt}>
				<Button title="Change" onPress={(id = 1) => updateUser((id = 1))} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		textAlign: 'center'
	},
	fullName: {
		top: 10,
		paddingLeft: 10,
		fontWeight: 'bold',
		fontSize: 40,
		width: 355
	},
	butt: {
		marginTop: 40,
		height: 60,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white'
	},

	input: {
		height: 40,
		margin: 12,
		marginTop: 25,
		borderBottomWidth: 2
	},
	fullName: {
		top: -130,
		paddingLeft: 10,
		fontWeight: 'bold',
		fontSize: 40
	},
	texty: {
		fontFamily: 'fantasy',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		alignContent: 'center',
		marginTop: 20
	},
	btnImg: {
		marginBottom: 20,
		padding: 50,
		bottom: -5,
		textAlign: 'center'
	}
});

export default UserUpdateInfo;
