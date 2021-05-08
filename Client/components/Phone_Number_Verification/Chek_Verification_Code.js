import React, { Component } from 'react'
import { View, Text, StyleSheet,AsyncStorage } from 'react-native'
import { KeycodeInput } from 'react-native-keycode'
import {MyText} from '../Tag_Modules/MyText'

import server_IP from '../../config/Server_IP'
import axios from 'axios'

export default class CheckVerification extends Component {

  state = {
    code: "",
    
  };
   _storeData = async (token) => {
		try {
		  await AsyncStorage.setItem(
			'Pinder_token',
			token
		  );
		} catch (error) {
		  console.log(error)
		}
	  };
  ResendSms() {
  const number = "+216"+this.props.route.params.number //==> props.phone_number ==> props from component Chek_Phone_Number&Send_Code 
  fetch("http://"+server_IP+":3000/verifSms/send",{
    body: JSON.stringify({number}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then(result =>{
      console.log(result);
    }).catch(err =>{console.log(err)})
  }

  
  verifycode(value){
    const number = "+216"+this.props.route.params.number //==> props.phone_number ==> props from component Chek_Phone_Number&Send_Code 
    fetch("http://"+server_IP+":3000/verifSms/verifyCode",{
      body: JSON.stringify({number,code:value}),
			headers: {
				'content-type': 'application/json'
			},
			method: 'POST'
		})
    .then( async result =>{
      var result = await result.json()
      if(result.success == true){
        fetch(`http://${server_IP}:3000/users/registred`,{
							body: JSON.stringify({email:'',phone:number}),
							headers: {
								'content-type': 'application/json'
							},
							method: 'POST'
						})
						.then(async (result)=>{
							result = await result.json();
							console.log(result)
							if(result.registred){
                this._storeData(result.token)
								console.log('loged in')
                this.props.navigation.navigate('Globalmenu')
							}else{
                this.props.navigation.navigate('UserImage',{
                  firstname:this.props.route.params.firstname,
                  lastname:this.props.route.params.lastname,
                  photo:this.props.route.params.photo,
                  email:this.props.route.params.email,
                  number:number
                });
							}
							
						})
						.catch((e) => console.log(e));
       
      }else{
        console.log('wrong code')
        this.setState({code:''})
      }
    })
    .catch(err =>{
      console.log(err)
    })
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: -20, marginBottom: 20 }}>
          <MyText style={{ color: "#505050", fontSize: 35, marginBottom: 10}}>
            Enter Your Code
          </MyText>
          <View>
            <MyText style={styles.textNum}> 
              +216{this.props.route.params.number}
              <MyText
                style={styles.textResend}
                onPress={() => console.log("RESEND")} //=> ResendSms()
              >
                {"   "}
                RESEND
              </MyText>
            </MyText>
          </View>
        </View>
        <KeycodeInput
          length={6}
          numeric={true}
          value={this.state.code}
          length={6}
          numeric
          onChange={(code) => {
            this.setState({ code: code });
          }}
          onComplete={(value) => {
            this.verifycode(value)
            
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 150,
    },
    textNum: {
      color: "#909090",
      fontSize: 18, 
    },
    textResend: {
      color: "#CCCCCC",
    },
});