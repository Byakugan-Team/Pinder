import React from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';

const UselessTextInput = ({navigation,route}) => {
	const [ firstname, onChangefirstname ] = React.useState((route.params.firstname)?route.params.firstname :'');
	const [ lastnmae, onChangelastname ] = React.useState((route.params.lastnmae)?route.params.lastnmae :'');

	
	return (
		<View style={{textAlign:'center'}}>
			<Text style={styles.fullName}>My FullName is </Text>
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={onChangefirstname} value={firstname} placeholder="First Name" />
				<TextInput style={styles.input} onChangeText={onChangelastname} value={lastnmae} placeholder="Last Name" />
				<View style={styles.texty}>
					<Text>This is how you will appear in Pinder and you will </Text>
					<Text>not be able to change it </Text>
				</View>
			</View>
			<View style={styles.butt}>
				<Button title="Continue" onPress={()=> navigation.navigate('PetsImage',{
					firstname,
					lastnmae,
					number:route.params.number 
				})}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		textAlign: 'center'
	},
	butt: {
		marginTop:40,
		height: 60,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'white'
	},

	input: {
		height: 40,
		margin: 12,
		marginTop:25,
		borderBottomWidth: 2
	},
	fullName: {
		top: -130,
		paddingLeft: 10,
		fontWeight: 'bold',
		fontSize: 40,

	},
	texty: {

		fontFamily: 'fantasy',
		justifyContent: 'center',
		textAlign: 'center',
		alignItems:'center',
		alignContent:'center',
		marginTop:20
	}
});

export default UselessTextInput;
