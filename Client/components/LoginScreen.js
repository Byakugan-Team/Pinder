import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableHighlight, TouchableOpacity ,AsyncStorage , Dimensions,ImageBackground} from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';
import { MyText } from './Tag_Modules/MyText'
import PhoneNumber from './Phone_Number_Verification/Chek_Phone_Number&Send_Code'
import server_IP from '../config/Server_IP'
import TextField from 'react-native-md-textinput';
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");
export default function LoginScreen({navigation}) {

	const [ defaultCode, setdefaultCode ] = useState("+216");
	const [ phone_Number, setphone_Number ] = useState("");
	const [ inputLength, setinputLength ] = useState(inputLength);

	const handlePhoneNum = (text) => {
		setphone_Number(text)
		setinputLength(text.length)
	  };
	  var sendSms = ()=> {
		const number = defaultCode + phone_Number;
		fetch("http://"+server_IP+":3000/verifSms/send",{
		  body: JSON.stringify({number}),
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST'
			})
		.then(result =>{
		  console.log('res',result);
		}).catch(err =>{console.log(err)})
	  }
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
								navigation.navigate('UserImage',{
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
                console.log('hy')
								navigation.navigate('UserImage',{
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
			<View style={styles.container}>
			  <ImageBackground
				style={{ width: width, height: height }}
				source={require("../assets/Home_Page/Background.png")}
			  >
				<TouchableOpacity
				  blurOnSubmit={false}
				  onPress={() => console.log("maw")}
				>
				  <Image
					style={styles.Img_CatPeek}
					source={require("../assets/Home_Page/CatPeek.png")}
				  />
				</TouchableOpacity>
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
	  
				  <Image
					style={styles.Logo_TEXT}
					source={require("../assets/Home_Page/Logo_Text.png")}
				  />
				  <View style={{ marginTop: height / 2.7 }}>
				  <Text style={{ fontWeight: "bold", color: "white", fontSize: 11, }}>
					Have a Pets, Have a Pinder
				  </Text>
				  </View>
				</View>
	  
				<View style={styles.Body}>
				  <Text style={{ color: "white", fontSize: 20, }}>Login With</Text>
					  <View>
	  
					  <TextField
					label={"Phone Number"}
					highlightColor={"white"}
					labelColor={"white"}
					textColor={"white"}
					keyboardType={"numeric"}
					numeric
					value={phone_Number}
					onChangeText={handlePhoneNum}
				  />
				  {inputLength == 8 ? (  
				  <TouchableHighlight
					style={styles.buttonClick}
					onPress={() => {
					  sendSms();
					  navigation.navigate('CheckVerification',{
					    number:phone_Number
					  })
					}}
				  >
					<Text style={styles.textButton}>Continue</Text>
				  </TouchableHighlight>        
			  ) : (        
				  <TouchableHighlight
					style={styles.disabledButton}
					disable
				  >
					<Text style={styles.textButton}>Continue</Text>
				  </TouchableHighlight>
			  )}
	  
					  </View>
					  <View style={{flexDirection: "row", marginTop:20}}>
	  
	  
		 <Image style={{width:width/4.5, height: 30}} source={require("../assets/Home_Page/Line.png")}/>
		 <Text style={{ color: "white", fontSize: 20, marginLeft:10, marginRight: 10}}>Or</Text>
		 <Image style={{width:width/4.5, height: 30}} source={require("../assets/Home_Page/Line.png")}/>
		  
					  </View>
				  <View style={{ flexDirection: "row", marginTop: height / 50 }}>
					<TouchableOpacity
					  blurOnSubmit={false}
					  onPress={signInAsync}
					>
					  <Image
						style={{
						  width: width / 5,
						  height: height / 10,
						  marginRight: width / 17,
						}}
						source={require("../assets/Home_Page/Google_Logo.png")}
					  />
					</TouchableOpacity>
					<TouchableOpacity
					  blurOnSubmit={false}
					  onPress={() => facebookLogIn()}
					>
					  <Image
						style={{
						  width: width / 5,
						  height: height / 10,
						  marginLeft: width / 17,
						}}
						source={require("../assets/Home_Page/Facebook_Logo.png")}
					  />
					</TouchableOpacity>
	  
				   
				  </View>
				</View>
			  </ImageBackground>
			</View>
		  
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  marginTop: StatusBar.currentHeight || 0,
	  alignItems: "center",
	  alignSelf: "center",
	},
	Img_CatPeek: {
	  width: width / 3,
	  height: height / 6.5,
	  marginTop: height / 5,
	  marginStart: -width / 5.8,
	  position: "absolute",
	},
	Logo_TEXT: {
	  width: width / 2.8,
	  height: height / 6.2,
	  marginTop: height / 5,
	  position: "absolute",
	},
	Body: {
	  top: height / 14,
	  alignItems: "center",
	  justifyContent: "center",
	},
	buttonClick: {
	  alignItems: "center",
	  // backgroundColor: "#EEEEEE",
	  padding: 5,
	  borderRadius: 30,
	  width: width / 1.8,
	  marginLeft: 13,
	  borderWidth: 2,
	  borderColor: "white",
   },
   disabledButton: {
	  alignItems: "center",
	  // backgroundColor: "#EEEEEE",
	  padding: 5,
	  borderRadius: 30,
	  width: width / 1.8,
	  marginLeft: 13,
   },
   textButton: {
	  color: "#FFFFFF",
	  fontSize: 25,
   },
  });
  