import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome5 } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
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
				// type === 'cancel'
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
		<View>
      
			<View style={styles.text}>
				<Text>
					by clicking log In, you agree with our terms. learn how we process your data in our privacy policy
					and Cookies Policy
				</Text>
			</View>
			<View style={styles.Buttons}>
				{/* <TouchableHighlight style={styles.loginBtn} onPress={signInAsync}>
					<Text>Login with Google</Text>
				</TouchableHighlight> */}
        <FontAwesome5.Button style={styles.googleButton} name="google" onPress={signInAsync}
        //any other customization you want, like borderRadius, color, or size
>
  <Text style={styles.googleText}>Log In With Google</Text>
</FontAwesome5.Button>


				<TouchableOpacity style={styles.loginBtn} onPress={() => facebookLogIn()}>
					<Text>Login with facebook</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.loginBtn}>
					<Text>Login With Phone Number</Text>
				</TouchableOpacity>
			</View>
			<View>
				<Image style={styles.logoForm} source={require('../assets/output-onlinepngtools (1).png')} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	// css Text :
	Buttons: {},
	text: {
		width: 355,
		top: 100,
		fontFamily: 'Cochin',
		fontStyle: 'normal',
		fontWeight: 'bold',
		textAlign: 'center',
		fontWeight: 'bold',
		right: -20,
		marginBottom: 100
	},
	//css logo form :
	logoForm: {
		position: 'relative',
		width: 188,
		height: 160,
		left: 90,
		top: 50

		//css login with facebook button:
	},
	loginBtn: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 20,
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		position: 'relative',
		marginTop: 15
	},
	linearGradient: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		height: 200,
		width: 350
	}
});
