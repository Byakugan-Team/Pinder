import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity ,AsyncStorage} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { MyText } from './Tag_Modules/MyText'
import PhoneNumber from './Phone_Number_Verification/Chek_Phone_Number&Send_Code'
import server_IP from '../config/Server_IP'
export default function LoginScreen({navigation}) {
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


	// log in with google api :
	const signInAsync = async () => {
		try {
			const { type, user } = await Google.logInAsync({
				iosClientId: `739502698795-quod31v0svm9pb9r096qm051hehv6o9r.apps.googleusercontent.com`,
				androidClientId: `739502698795-fntc1fsct3bl1vup04smbv3cv1spnbkt.apps.googleusercontent.com`
			});

			if (type === 'success') {
				// Then you can use the Google REST API
				fetch(`http://${server_IP}:3000/users/registred`,{
							body: JSON.stringify({email:user.email,phone:''}),
							headers: {
								'content-type': 'application/json'
							},
							method: 'POST'
						})
						.then(async (result)=>{
							result = await result.json();

							if(result.registred){
								_storeData(result.token)
								console.log('loged in')
								navigation.navigate('Globalmenu')
							}else{
								navigation.navigate('PhoneNumber',{
									firstname:user.name.split(' ')[0],
									lastname:user.name.split(' ')[1],
									email:user.email,
									photo:user.photoUrl
								})
							}
							
						})
						.catch((e) => console.log(e));
				
			}
		} catch (error) {
			console.log('LoginScreen.js 19 | error with login', error);
		}
	};

	// login with facebook api :
	const [ isLoggedin, setLoggedinStatus ] = useState(false);
	const [ userData, setUserData ] = useState(null);
	const [ isImageLoading, setImageLoadStatus ] = useState(false);

	var facebookLogIn = async () => {
		try {
			await Facebook.initializeAsync({
				appId: '512232703487791'
			});
			const {
				type,
				token,
				expires,
				permissions,
				declinedPermissions
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: [ 'public_profile','email' ]
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email,picture.height(500)`)
					.then((response) => response.json())
					.then((data) => {

						setLoggedinStatus(true);
						setUserData(data);
						fetch(`http://${server_IP}:3000/users/registred`,{
							body: JSON.stringify({email:data.email,phone:''}),
							headers: {
								'content-type': 'application/json'
							},
							method: 'POST'
						})
						.then(async (result)=>{
							result = await result.json();
							if(result.registred){
								_storeData(result.token)
								console.log('loged in')
								navigation.navigate('Globalmenu')
							}else{
								navigation.navigate('PhoneNumber',{
									firstname:data.first_name,
									lastname:data.last_name,
									email:data.email,
									photo:data.picture.data.url
								})
							}
							
						})
						.catch((e) => console.log(e));
						
					})
					.catch((e) => console.log(e));
			} else {
			}
		} catch ({ message }) {
			console.log(`Facebook Login Error: ${message}`);
		}
	};

	var logout = () => {
		setLoggedinStatus(false);
		setUserData(null);
		setImageLoadStatus(false);
	};
	
	return (
		<View >
			<Image style={styles.Catpeek} source={{ uri: 'https://i.ibb.co/Hx2QBLc/output-onlinepngtools-2.png' }} />
			<Image style={styles.logoForm} source={{ uri: 'https://i.ibb.co/Ttb6xwD/output-onlinepngtools-1.png' }} />
			<View style={styles.text}>
				<Text style={styles.body}>
					By clicking log In, you agree with our terms. learn how we process your data in our privacy policy
					and Cookies Policy
				</Text>
			</View>
			<View style={styles.Buttons}>
				<TouchableHighlight style={styles.loginBtn} onPress={signInAsync}>
					<View style={styles.cont}>
						<Image style={styles.img} source={{ uri: 'https://img-authors.flaticon.com/google.jpg  ' }} />
						<MyText> Login with Google</MyText>
					</View>
				</TouchableHighlight>
				<TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
					<View>
						<Image
							style={styles.img}
							source={{
								uri:
									'https://thumbs.dreamstime.com/b/vinnytsia-ukraine-january-facebook-vector-flat-icon-letter-f-image-209179420.jpg '
							}}
						/>
						<Text>Login with facebook</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.loginBtn} onPress={()=> navigation.navigate('PhoneNumber')} >
					<View>
						<Image
							style={styles.imge}
							source={{
								uri:
									'https://thumbs.dreamstime.com/b/phone-icon-silhouette-telephone-symbol-vector-illustration-isolated-white-background-156327796.jpg'
							}}
						/>
						<Text>Login With Phone Number</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	Catpeek: {
		position: 'absolute',
		left:-73,
		top:5,
		width: 125,
		height: 110,

		//css login with facebook button:
	},
	// css Text :
	body: {
		color: 'white',
		justifyContent: 'center',
		// fontFamily: 'Cochin',
		fontStyle: 'normal',
		textAlign: 'center',
		marginRight: 50
	},
	//css of the text :
	text: {
		color: 'white',
		width: 355,
		top: 120,
		right: -20,
		marginBottom: 100
	},
	//css of facebook and email img :
	img: {
		position: 'absolute',
		width: 30,
		height: 30,
		left: -100,
		top: -5
	},
	//css of phone number img :
	imge: {
		position: 'absolute',
		width: 30,
		height: 30,
		left: -75,
		top: -5
	},
	//css logo form pinder:
	logoForm: {
		position: 'relative',
		width: 125,
		height: 110,
		left: 120

		//css login with facebook button:
	},
	loginBtn: {
		paddingVertical: 10,
		paddingHorizontal: 50,
		borderRadius: 20,
		alignItems: 'center',
		backgroundColor: 'white',
		padding: 100,
		position: 'relative',
		marginTop: 15,
		top: 30,
	}
});
