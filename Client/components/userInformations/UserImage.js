import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, Button, Platform , ImageBackground, TouchableOpacity,TextInput,Dimensions} from 'react-native';
import server_IP from '../../config/Server_IP'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location';

export default function Photo({navigation,route}) {

	const [ keyboardOpen, setkeyboardOpen ] = useState(false);
	const [ colorinput, setColor ] = useState(true);
	const [ data, setPhoto ] = useState((route.params.photo) ? route.params.photo : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
	const [ firstname, onChangefirstname ] = React.useState((route.params.firstname)?route.params.firstname :'');
	const [ lastnmae, onChangelastname ] = React.useState((route.params.lastname)?route.params.lastname :'');
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
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
	useEffect(() => {
		(async () => {
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync({});
		  setLocation(location);


		})();
	  }, []);

	const CreateUser = ()=>{
		
		var user = {
			firstname:firstname,
			lastname:lastnmae,
			number:route.params.number,
			email:route.params.email,
			photo:data,
			location:location
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
				navigation.navigate('Globalmenu',{
					newRegistred:true
				})
				}
			})
			.catch((err) => console.log(err));
		
	}
	
	return (
		<ImageBackground
            source={require('../../assets/images/bg.png')}
            style={(colorinput ? styles.bg: styles.bgup)}
          >
			  
			<TouchableOpacity onPress={() => openImagePickerAsync()}>
				<ImageBackground style={styles.img} imageStyle={{ borderRadius: 125 }} source={{ uri: data }} >
					<TouchableOpacity style={{position: 'absolute',bottom: 10,right:10}} onPress={() => openImagePickerAsync()}>
							<MaterialCommunityIcons name="plus-circle" color={'#e74c3c'} size={35} />
					</TouchableOpacity>
				</ImageBackground>

		</TouchableOpacity>
		<TextInput style={(colorinput ? styles.input : styles.inputred)} onChangeText={onChangefirstname} onFocus={()=> setColor(false)} onBlur={()=> setColor(true)}  value={firstname} placeholder="First Name" />
		<TextInput style={(colorinput ? styles.input : styles.inputred)} onChangeText={onChangelastname} onFocus={()=> setColor(false)} onBlur={()=> setColor(true)}  value={lastnmae} placeholder="Last Name" />
			<View style={styles.btn}>
				<Button title="Continue" onPress={()=>CreateUser()}/>
			</View>
		</ImageBackground>
	);
}
const theme = { colors: { primary: '#CA9D0C' } };
const styles = StyleSheet.create({
	img: {
		width: 250,
		height: 250,
		resizeMode: 'cover',
		marginTop:100,
		opacity: 10,

	},
	input: {
		height: 40,
		margin: 30,
		fontSize:17,
		textAlign:'center',
		width:250,
		borderBottomWidth: 0.5
	},
	inputred: {
		height: 40,
		margin: 30,
		fontSize:17,
		textAlign:'center',
		width:250,
		borderBottomColor:'#5EC2E0',
		borderBottomWidth: 0.5
	},
	btn:{
		width:150,
		marginTop:50
	},
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: Dimensions.get("window").width,
		height:  Dimensions.get("window").height,
		alignItems:'center'
	},
	bgup: {
		top:-100,
		flex: 1,
		resizeMode: "cover",
		width: Dimensions.get("window").width,
		height:  Dimensions.get("window").height,
		alignItems:'center'
	},
});
