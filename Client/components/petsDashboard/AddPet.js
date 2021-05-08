import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Platform,Image,ScrollView,ImageBackground,TouchableOpacity,Pressable,KeyboardAvoidingView,Picker } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { RadioButton} from 'react-native-paper';
import server_IP from '../../config/Server_IP'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInputMask } from 'react-native-masked-text';
import { set } from 'react-native-reanimated';
// import { updateUser } from '../../../server/controllers/users'

const AddPet = ({ navigation,User }) => {
	const [ nickname, setNickname ] = useState('');
	const [ gendre, setGendre ] = useState('');
	const [ pet, setPet ] = useState('');
	const [ birth, setBirth ] = useState(null);
	const [ category, setCategory ] = useState('');
    const [radio , setRadio] = useState('');
    const [ localUri, setSelectedImage ] = useState('');
	const [ data, setPhoto ] = useState('x') 
	const [ data1, setPhoto1 ] = useState('x') 
	const [ data2, setPhoto2 ] = useState('x') 
	const [date, setDate] = useState(new Date(Date.now()));
	const [dateConverted, setdateConverted] = useState();
	const [mode, setMode] = useState('date');
	const [show, setShow] = useState(false);
	
	const petDetails = {
        nickname:  nickname,
        gendre:  gendre,
		birth: dateConverted,
		category: category,
        photo:[data,data1,data2]
		// image: data
	};

	const openImagePickerAsync = async (num) => {
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
				if(num == 1){
					setPhoto(data.url);
				}else if(num == 2){
					setPhoto1(data.url);
				}else{
					setPhoto2(data.url);
				}
				
			})
			.catch((err) => console.log(err));
	};
	const AddPetfun = () => {
		var  id =User
		
		 fetch('http://'+server_IP+':3000/pets/'+id, 	{body: JSON.stringify({
            name: nickname,
			gender:gendre,
			pet:pet,
			birth:dateConverted,
			category:category,
			photo:[data,data1,data2]
		}),
				headers: {
				    'content-type': 'application/json'
				},
				method: 'POST'}
			)
			.then(async (res) => {
				res = await res.json()
				console.log(res)
				if(res.success){
					setBirth(null)
					setCategory('')
					setDate('')
					setNickname('')
					setGendre('')
					setPhoto('x')
					setPhoto1('x')
					setPhoto2('x')
					setdateConverted('')
					setPet('')
				}
			}).catch ((err)=>{
				console.log(err, 'hiiii')
			})
	};
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		console.log(currentDate)
		setShow(Platform.OS === 'ios');
		setDate(currentDate);

			var today = selectedDate
			var dd = today.getDate();
		
			var mm = today.getMonth()+1; 
			var yyyy = today.getFullYear();
			if(dd<10) 
			{
				dd='0'+dd;
			} 
		
			if(mm<10) 
			{
				mm='0'+mm;
			} 
			setdateConverted(dd+'/'+mm+'/'+yyyy)

	  };
	
	  const showMode = (currentMode) => {
		setShow(true);
		setMode(currentMode);
	  };
	
	  const showDatepicker = () => {
		showMode('date');
	  };
	

	{birth && console.log(birth.toString() )}
	const listCat = ()=>{
		var dogs = ["affenpinscher","Afghan hound","Airedale terrier","Akita","Alaskan Malamute","American Staffordshire terrier","American water spaniel","Australian cattle dog","Australian shepherd","Australian terrier","basenji","basset hound","beagle","bearded collie","Bedlington terrier","Bernese mountain dog","bichon frise","black and tan coonhound","bloodhound","border collie","border terrier","borzoi","Boston terrier","bouvier des Flandres","boxer","briard","Brittany","Brussels griffon","bull terrier","bulldog","bullmastiff","cairn terrier","Canaan dog","Chesapeake Bay retriever","Chihuahua","Chinese crested","Chinese shar-pei","chow chow","Clumber spaniel","cocker spaniel","collie","curly-coated retriever","dachshund","Dalmatian","Doberman pinscher","English cocker spaniel","English setter","English springer spaniel","English toy spaniel","Eskimo dog","Finnish spitz","flat-coated retriever","fox terrier","foxhound","French bulldog","German shepherd","German shorthaired pointer","German wirehaired pointer","golden retriever","Gordon setter","Great Dane","greyhound","Irish setter","Irish water spaniel","Irish wolfhound","Jack Russell terrier","Japanese spaniel","keeshond","Kerry blue terrier","komondor","kuvasz","Labrador retriever","Lakeland terrier","Lhasa apso","Maltese","Manchester terrier","mastiff","Mexican hairless","Newfoundland","Norwegian elkhound","Norwich terrier","otterhound","papillon","Pekingese","pointer","Pomeranian","poodle","pug","puli","Rhodesian ridgeback","Rottweiler","Saint Bernard","saluki","Samoyed","schipperke","schnauzer","Scottish deerhound","Scottish terrier","Sealyham terrier","Shetland sheepdog","shih tzu","Siberian husky","silky terrier","Skye terrier","Staffordshire bull terrier","soft-coated wheaten terrier","Sussex spaniel","spitz","Tibetan terrier","vizsla","Weimaraner","Welsh terrier","West Highland white terrier","whippet","Yorkshire terrier"]
		var cats = ["Abyssinian","Abyssinian","Aegean","Aegean","American","American","American","American","American","American","American","American","American","Aphrodite","Aphrodite","Arabian","Arabian","Asian","foundation","Asian","Asian","Asian","Australian","Australian","Balinese","foundation","Balinese","Bambino","Bengal","but","Bengal","Birman","foundation","Birman","Bombay","Bombay","Brazilian","Brazilian","British","British","British","British","Burmese","Burmese","Burmilla","Burmilla","California","California","Chantilly-Tiffany","Chantilly-Tiffany","Chartreux","Chartreux","Chausie","Chausie","Colorpoint","Colorpoint","Cornish","Mutation","Cornish","Cymric,","Cymric","Cyprus","Cyprus","Devon","Devon","Donskoy","Don","Donskoy","Dragon","Chinese","Dragon","Dwelf","Egyptian","Egyptian","European","European","Exotic","Exotic","Foldex[9]","Foldex","German","German","Havana","foundation","Havana","Highlander","Highlander","Himalayan","Colorpoint","Himalayan","Japanese","Japanese","Javanese","Colorpoint","foundation","Javanese","Kanaani","Khao","Khao","Kinkalow","Kinkalow","Korat","Korat","Korean","Japanese","Korn","Kurilian","Kuril","Kurilian","Lambkin","LaPerm","LaPerm","Lykoi","Lykoi","Maine","Maine","Manx","Manx","Mekong","Mekong","Minskin","Minskin","Napoleon","Napoleon","Munchkin","Munchkin","Nebelung","Nebelung","Norwegian","Norwegian","Ocicat","Ocicat","Ojos","Ojos","Oregon","(extinct)","Oriental","foundation","Oriental","Oriental","foundation","Oriental","Oriental","foundation","Oriental","Persian","foundation","Persian,","Persian","Traditional","Peterbald","before","Peterbald","Pixie-bob","Pixie-bob","Ragamuffin","Liebling","Ragamuffin","Ragdoll","Ragdoll","Raas","Russian","Russian","Russian","foundation","Sam","Savannah","Savannah","Scottish","Lilac-coated","Selkirk","Selkirk","Serengeti","Serengeti","Serrade","Serrade","Siamese","(for","foundation","Siamese","Siberian","Siberian","Neva","Siberian","Singapura","foundation","Singapura","Snowshoe","Snowshoe","Sokoke","Sokoke","Somali","Somali","Sphynx","Sphynx","Suphalak","Suphalak","Thai","Traditional,","Wichien","Thai","Thai","Thai","Tonkinese","Tonkinese","Toyger","Toyger","Turkish","Turkish","Turkish","foundation","Turkish","Turkish","Van","Ukrainian","Ukrainian","York","York"]
		if(pet == 'Dog'){
			return dogs.map((element)=> <Picker.Item label={element} value={element} />)
		}else if(pet == 'Cat'){
			return cats.map((element)=> <Picker.Item label={element} value={element} />)
		}
	}
	return (
		<KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>

		<ScrollView style={{ textAlign: 'center',height:500 }}>
			<View style={{flexDirection: "row",backgroundColor:'white'}}>
			<TouchableOpacity onPress={() => openImagePickerAsync(1)}>
				<ImageBackground style={styles.img} source={{ uri: data }} imageStyle={{ borderRadius: 10}} >
					<TouchableOpacity style={{position: 'absolute',bottom: -15,right:-15}} onPress={() => openImagePickerAsync(1)}>
							<MaterialCommunityIcons name="plus-circle" color={'#e74c3c'} size={35} />
					</TouchableOpacity>
				</ImageBackground>

		</TouchableOpacity>
		<TouchableOpacity onPress={() => openImagePickerAsync(2)}>
			<ImageBackground style={styles.img} source={{ uri: data1 }} imageStyle={{ borderRadius: 10}} >
				<TouchableOpacity style={{position: 'absolute',bottom: -15,right:-15}} onPress={() => openImagePickerAsync(2)} >
                        <MaterialCommunityIcons name="plus-circle" color={'#e74c3c'} size={35} />
                    </TouchableOpacity>
				</ImageBackground>

		</TouchableOpacity>
		<TouchableOpacity onPress={() => openImagePickerAsync(3)}>
			<ImageBackground style={styles.img} source={{ uri: data2 }} imageStyle={{ borderRadius: 10}} >
				<TouchableOpacity style={{position: 'absolute',bottom: -15,right:-15}} onPress={() => openImagePickerAsync(3)} >
                        <MaterialCommunityIcons name="plus-circle" color={'#e74c3c'} size={35} />
                    </TouchableOpacity>
				</ImageBackground>

		</TouchableOpacity>
			</View>
			<View style={styles.container}>
				<View style={{flexDirection: "row"}}>
				<TextInput style={styles.input} onChangeText={setNickname} value={nickname} placeholder="nickname" />
					<View style={{ height: 40,
		margin: 12,
		marginTop: 25,
		borderBottomColor:"#757E90",
		borderBottomWidth: 1,
		flex:1  }}>
					<Picker
                          selectedValue={pet}
                          style={{height: 50, width: 150,bborderBottomColor:'black',borderBottomWidth:2,fontSize:10}}

                          onValueChange={(itemValue, itemIndex) => setPet(itemValue)}
                        >
						<Picker.Item label="Pet Type" value=""  />
                          <Picker.Item label="Dog" value="Dog" />
                          <Picker.Item label="Cat" value="Cat" />
                        </Picker>
					</View>
				</View>
				<View style={{flexDirection: "row"}}>
				<View style={{ height: 40,
		margin: 12,
		marginTop: 25,
		borderBottomColor:"#757E90",
		borderBottomWidth: 1,
		flex:1  }}>
					<Picker
                          selectedValue={gendre}
                          style={{height: 50, width: 150,bborderBottomColor:'black',borderBottomWidth:2,fontSize:10}}

                          onValueChange={(itemValue, itemIndex) => setGendre(itemValue)}
                        >
						<Picker.Item label="Gender" value=""  />
                          <Picker.Item label="Male" value="Male" />
                          <Picker.Item label="Female" value="Female" />
                        </Picker>
					</View>
					<View style={{ height: 40,
		margin: 12,
		marginTop: 25,
		borderBottomColor:"#757E90",
		borderBottomWidth: 1,
		flex:1  }}>
					<Picker
                          selectedValue={category}
                          style={{height: 50, width: 150,bborderBottomColor:'black',borderBottomWidth:2,fontSize:10}}

                          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        >
						<Picker.Item label="Category" value=""  />
                         {listCat()}
                        </Picker>
					</View>
				</View>

		<View>
			<View>
			<Pressable onPress={showDatepicker}>
				<View pointerEvents="none">
				<TextInput
				style={styles.input}
				placeholder="DD/MM/YYYY"
				type={'datetime'}
				options={{
					format: 'DD/MM/YYYY',
				}}
				value={dateConverted}
				onFocus={showDatepicker}
				// add the ref to a local var
				/>
				</View>
			</Pressable>
				{/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
			</View>
			{show && (
				<DateTimePicker
				testID="dateTimePicker"
				value={date}
				mode={mode}
				is24Hour={true}
				display="default"
				onChange={onChange}
				/>
			)}
    </View>		

				
			</View>
			<View style={styles.butt}>
				<Button title="Add Pet" onPress={() => AddPetfun()} />
			</View>
		</ScrollView>
				</KeyboardAvoidingView>

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
		borderBottomColor:"#757E90",
		borderBottomWidth: 1,
		flex:1
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
		  marginVertical:20,
		width: 100,
		height: 150,
		marginLeft:10,
		backgroundColor: '#e4e4ee',
		borderRadius:20,

		opacity: 10,

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
