import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Platform,Image,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { RadioButton} from 'react-native-paper';
import server_IP from '../../config/Server_IP'

// import { updateUser } from '../../../server/controllers/users'

const AddPet = ({ navigation }) => {
	const [ nickname, setNickname ] = useState('');
	const [ gendre, setGendre ] = useState('');
	const [ birth, setBirth ] = useState('');
	const [ category, setCategory ] = useState('');
    const [radio , setRadio] = useState('');
    const [ localUri, setSelectedImage ] = useState('');
	const [ data, setPhoto ] = useState('') 

	

	const petDetails = {
        nickname:  nickname,
        gendre:  gendre,
		birth: birth,
		category: category,
        photo:data
		// image: data
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
                console.log(data.url)
				setPhoto(data.url);
			})
			.catch((err) => console.log(err));
	};
	const AddPet = () => {
		console.log(petDetails, 'hello')
		var  id =1
		 fetch('http://'+server_IP+':3000/pets/'+id, 	{body: JSON.stringify({
            name: nickname,
			gender:gendre,
			birth:birth,
			category:category,
			photo:data
		}),
				headers: {
				    'content-type': 'application/json'
				},
				method: 'POST'}
			)
			.then((res) => {
				console.log(res);
			}).catch ((err)=>{
				console.log(err, 'hiiii')
			})
	};

	return (
		<ScrollView style={{ textAlign: 'center' }}>
			<View>
			<Image style={styles.img} source={{ uri: data }} />
			<View style={styles.btnImg}>
				<Button theme={theme} title="Select photo" mode="contained" onPress={() => openImagePickerAsync()} />
			</View>

		</View>
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={setNickname} value={nickname} placeholder="nickname" />
				{/* <TextInput style={styles.input} onChangeText={setGendre} value={gendre} placeholder="gendre" /> */}
                {/* <RadioButton.Group
        //   onValueChange={value1 => this.setState({ value1  })}
        //   value={this.state.value1}
        >
           <View style={{flexDirection:"row",alignItems:'left'}}>
           <View style={{width:"1"}}>
                <RadioButton value="Male"  
                color={'#02D1E0'}
                status={ radio === 'Male' ? 'checked' : 'unchecked' }
                 onPress={() => setRadio('Male')} />
            </View>
           <View style={{marginTop:8}}>
               <Text onPress={() => setRadio('Male')}  >Male</Text>
            </View>
            
          </View>
          <View style={{flexDirection:"row",alignItems:'left'}}>
           <View style={{width:"1"}}>
                <RadioButton
                color={'#02D1E0'}
                value="Female" 
                status={ radio === 'Female' ? 'checked' : 'unchecked' }
                onPress={() => setRadio('Female')}/>
            </View>
           <View style={{marginTop:8}}>
               <Text onPress={() => setRadio('Female')} >Female</Text>
            </View>
            
          </View>
        </RadioButton.Group> */}
               
        <TextInput style={styles.input} onChangeText={setBirth} value={birth} placeholder="Birth Date" />

				<TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="category" />
			</View>
			<View style={styles.butt}>
				<Button title="Add Pet" onPress={(id = 1) => AddPet((id = 1))} />
			</View>
		</ScrollView>
	);
};
const theme = { colors: { primary: '#CA9D0C' } };
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
	},
      title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
      img: {
		width: 200,
		height: 300,
		backgroundColor: '#e4e4ee',
		resizeMode: 'cover',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		left: 80,
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

export default AddPet;
