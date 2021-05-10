import React, { useState, useEffect,useRef } from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, View, Button, Platform , ImageBackground, TouchableOpacity,TextInput,Dimensions,AsyncStorage} from 'react-native';
import server_IP from '../../config/Server_IP'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location';


Notifications.setNotificationHandler({
	handleNotification: async () => ({
	  shouldShowAlert: true,
	  shouldPlaySound: false,
	  shouldSetBadge: false,
	}),
  });

export default function Photo({navigation,route}) {

	const [ keyboardOpen, setkeyboardOpen ] = useState(false);
	const [ colorinput, setColor ] = useState(true);
	const [ data, setPhoto ] = useState((route.params.photo) ? route.params.photo : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png');
	const [ firstname, onChangefirstname ] = React.useState((route.params.firstname)?route.params.firstname :'');
	const [ lastnmae, onChangelastname ] = React.useState((route.params.lastname)?route.params.lastname :'');
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();
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
	  
	  useEffect(() => {
		registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
	
		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
		  setNotification(notification);
		});
	
		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
		  console.log(response);
		});
	
		return () => {
		  Notifications.removeNotificationSubscription(notificationListener.current);
		  Notifications.removeNotificationSubscription(responseListener.current);
		};
	  }, []);
	  async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
		  const { status: existingStatus } = await Notifications.getPermissionsAsync();
		  let finalStatus = existingStatus;
		  if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		  }
		  if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		  }
		  token = (await Notifications.getExpoPushTokenAsync()).data;
		  console.log('expo Token : ',token);
		} else {
		  alert('Must use physical device for Push Notifications');
		}
	  
		if (Platform.OS === 'android') {
		  Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		  });
		}
	  
		return token;
	  }
	const openImagePickerAsync = async () => {
		let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}

		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,

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
			location:location,
			notifications_Token:expoPushToken
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
							<MaterialCommunityIcons name="plus-circle" color={'#3498db'} size={35} />
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
