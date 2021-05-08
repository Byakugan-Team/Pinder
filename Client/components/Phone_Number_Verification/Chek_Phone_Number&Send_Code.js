import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableHighlight, StyleSheet } from 'react-native'
import TextField from 'react-native-md-textinput';
import server_IP from '../../config/Server_IP'


export default class PhoneNumber extends Component {
  state = {
    defaultCode: "+216",
    phone_number: "",
    inputLength: 0,
  };
  
  handlePhoneNum = (text) => {
    this.setState({ phone_number: text, inputLength: text.length });
  };

  sendSms() {
    const number = this.state.defaultCode+this.state.phone_number;
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
          
  render() {
    
    return (
      <ScrollView style={styles.container}>
        <TextField
          label={"Phone Number"}
          highlightColor={"#5EC2E0"}
          keyboardType={"numeric"}
          numeric
          value={this.state.phone_number}
          onChangeText={this.handlePhoneNum}
        />
        <Text style={styles.text}>
          When you tap Countinue, Pinder will send a message with verification
          code.
        </Text>
        {this.state.inputLength == 8 ? (  
            <TouchableHighlight
              style={styles.buttonClick}
              onPress={() => {
                this.sendSms();
                this.props.navigation.navigate('CheckVerification',{
                  firstname:( this.props.route.params && this.props.route.params.firstname) ? this.props.route.params.firstname :'',
                  lastname:( this.props.route.params && this.props.route.params.lastname) ? this.props.route.params.lastname :'',
                  photo:( this.props.route.params && this.props.route.params.photo) ? this.props.route.params.photo :'',
                  email:( this.props.route.params && this.props.route.params.email) ? this.props.route.params.email :'',
                  number:this.state.phone_number
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
        <StatusBar style="auto" />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    padding: 40,
   },
  text: {
    margin: 5,
    marginTop: -20,
    marginBottom: -10,
    fontSize: 11,
    padding: 30,
    color: "#BBBBBB"
  },
   buttonClick: {
      alignItems: "center",
      backgroundColor: "#5EC2E0",
      padding: 10,
      borderRadius: 30,
      width: 260,
      marginLeft: 13,
   },
   disabledButton: {
      alignItems: "center",
      backgroundColor: "#EEEEEE",
      padding: 12,
      borderRadius: 30,
      width: 260,
      marginLeft: 13,
   },
   textButton: {
      color: "#FFFFFF",
      fontSize: 20,
   },
})