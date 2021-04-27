import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// import { updateUser } from '../../../server/controllers/users'

const UpdatePetInfo = ({ navigation }) => {
	const [ nickname, setNickname ] = useState('');
	const [ gendre, setGendre ] = useState('');
	const [ birth, setBirth ] = useState('');
	const [ category, setCategory ] = useState('');
	// const [ image, setImage ] = useState('');

	const petDetails = {
        nickname:  nickname,
        gendre:  gendre,
		birth: birth,
		category: category,
		// image: image
	};

	
	const updatePet = (id) => {
		console.log(petDetails, 'hello')
		// id =1
		 axios.patch('http://localhost:3000/users/' + id, 	{
            nickname: nickname,
			gendre:gendre,
			birth:birth,
			category:category,
			
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
			<Text style={styles.fullName}>Update Pet profile </Text>
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={setNickname} value={nickname} placeholder="nickname" />
				<TextInput style={styles.input} onChangeText={setGendre} value={gendre} placeholder="gendre" />
				<TextInput style={styles.input} onChangeText={setBirth} value={birth} placeholder="Last Name" />
				<TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="category" />
				{/* <View style={styles.btnImg}>
					<Button title="Change Image" mode="contained" onPress={() => openImagePickerAsync()} />
				</View> */}
				<View style={styles.texty}>
					<Text>Here you can update your Pet profile</Text>
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

export default UpdatePetInfo;
