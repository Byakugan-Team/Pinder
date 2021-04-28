import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import { RadioButton} from 'react-native-paper';

// import { updateUser } from '../../../server/controllers/users'

const UpdatePetInfo = ({ navigation }) => {
	const [ nickname, setNickname ] = useState('');
	const [ gendre, setGendre ] = useState('');
	const [ birth, setBirth ] = useState('');
	const [ category, setCategory ] = useState('');
    const [male , setMale] = useState('');
    // const [female, setFemale] = useState('')
	

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
				{/* <TextInput style={styles.input} onChangeText={setGendre} value={gendre} placeholder="gendre" /> */}
                <RadioButton.Group
        //   onValueChange={value1 => this.setState({ value1  })}
        //   value={this.state.value1}
        >
          <View>
            <Text>Male</Text>
            <RadioButton value="Male" />
          </View>
          <View>
            <Text>Female</Text>
            <RadioButton value="Female" />
          </View>
        </RadioButton.Group>
               
        <DatePicker
          style={styles.datePickerStyle}
          onDateChange={setBirth} value={birth}
        //   date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="28/04/2021"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2080"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
				<TextInput style={styles.input} onChangeText={setCategory} value={category} placeholder="category" />
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
      }
});

export default UpdatePetInfo;
