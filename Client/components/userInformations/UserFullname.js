import React from 'react';
import { View, StyleSheet, TextInput, Text, Button } from 'react-native';

const UselessTextInput = ({navigation}) => {
	const [ text, onChangeText ] = React.useState();
	const [ number, onChangeNumber ] = React.useState();

	return (
		<View style={{textAlign:'center'}}>
			<Text style={styles.fullName}>My FullName is </Text>
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder="First Name" />
				<TextInput style={styles.input} onChangeText={onChangeNumber} value={number} placeholder="Last Name" />
				<View style={styles.texty}>
					<Text>This is how you will appear in Pinder and you will </Text>
					<Text>not be able to change it </Text>
				</View>
			</View>
			<View style={styles.butt}>
				<Button title="Continue" onPress={()=> navigation.navigate('PetsDashboard')}/>
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
