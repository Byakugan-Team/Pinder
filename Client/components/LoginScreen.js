import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Image ,TouchableHighlight , TouchableOpacity} from 'react-native';
import { Component } from 'react';
import * as Facebook from 'expo-facebook';


export default function LoginScreen  ()  {

	const [isLoggedin, setLoggedinStatus] = useState(false);
  	const [userData, setUserData] = useState(null);
  	const [isImageLoading, setImageLoadStatus] = useState(false);

	  var facebookLogIn = async () => {
    try {
        await Facebook.initializeAsync({
            appId: '512232703487791',
          });
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)


          .then(response => response.json())
          .then(data => {
			  console.log(data)
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  var logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  }


	var signInWithGoogleAsync = async () => {
		try {
			const result = await Google.logInAsync({
				// androidClientId: YOUR_CLIENT_ID_HERE,
				behavior: 'web',
				iosClientId: '739502698795-g09vk3e5mkvknulfctogp4lnkepmjjnh.apps.googleusercontent.com',
				scopes: [ 'profile', 'email' ]
			});

			if (result.type === 'success') {
				return result.accessToken;
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			return { error: true };
		}
	};
 
		return (  
			<View style={styles.container}>
				<View>
					<Image  style={styles.logoForm} source={'https://i.ibb.co/Ttb6xwD/output-onlinepngtools-1.png'} />
				</View>
				<View style={styles.text}>
					<Text>
						by clicking log In, you agree with our terms. learn how we process your data in our privacy
						policy and Cookies Policy
					</Text>
				</View>
				<View style={styles.Buttons}>
                <TouchableHighlight style={styles.loginBtn} onPress={()=> signInWithGoogleAsync()}  >

                <Text>Login with Google</Text>

                </TouchableHighlight>
                    <TouchableOpacity style={styles.loginBtn} onPress={()=> facebookLogIn()}  >

						<Text>Login with facebook</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginBtn}>
                      <Text>Login With Phone Number</Text>
                    </TouchableOpacity>

				</View>
			</View>
		);
	}


const styles = StyleSheet.create({
// css Text :
container:{
	backgroundColor:'red', 
},	
Buttons:{

},
	text: {
		width: 355,
		top: 100,
    fontFamily: 'Cochin',
    fontStyle: 'normal',
    fontWeight: 'bold',
    textAlign: 'center', 
    fontWeight: 'bold',
    right:-20,
    marginBottom:100,
	},
  //css logo form :
	logoForm: {
    position:'relative',
		width: 188,
		height: 160,
		left: 90,
		top: 50,	
    
    //css login with facebook button:
	},loginBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    position:'relative',
      marginTop:15,
},
linearGradient: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  height: 200,
  width: 350,
},

});