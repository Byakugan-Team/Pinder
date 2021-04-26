import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import PhoneNumber from './Phone_Number_Verification/Chek_Phone_Number&Send_Code'

export default function LoginScreen({navigation}) {
	// log in with google api :
	const signInAsync = async () => {
		console.log('LoginScreen.js 6 | loggin in');
		try {
			const { type, user } = await Google.logInAsync({
				iosClientId: `739502698795-quod31v0svm9pb9r096qm051hehv6o9r.apps.googleusercontent.com`,
				androidClientId: `739502698795-fntc1fsct3bl1vup04smbv3cv1spnbkt.apps.googleusercontent.com`
			});

			if (type === 'success') {
				// Then you can use the Google REST API
				console.log('LoginScreen.js 17 | success, navigating to profile');
				navigation.navigate('Profile', { user });
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
				permissions: [ 'public_profile' ]
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						setLoggedinStatus(true);
						setUserData(data);
					})
					.catch((e) => console.log(e));
			} else {
			}
		} catch ({ message }) {
			alert(`Facebook Login Error: ${message}`);
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
					by clicking log In, you agree with our terms. learn how we process your data in our privacy policy
					and Cookies Policy
				</Text>
			</View>
			<View style={styles.Buttons}>
				<TouchableHighlight style={styles.loginBtn} onPress={signInAsync}>
					<View style={styles.cont}>
						<Image style={styles.img} source={{ uri: 'https://img-authors.flaticon.com/google.jpg  ' }} />
						<Text> Login with Google</Text>
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
