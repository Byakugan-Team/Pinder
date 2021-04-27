import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { KeycodeInput } from 'react-native-keycode'
import axios from 'axios'

export default class CheckVerification extends Component {

  state = {
    code: "",
    
  };

  ResendSms() {
  const number = "+216"+this.props.route.params.number //==> props.phone_number ==> props from component Chek_Phone_Number&Send_Code 
    axios.post("http://localhost:3000/verifSms/send", {number})
    .then(result =>{
      console.log(result);
    }).catch(err =>{console.log(err)})
  }
  verifycode(value){
    const number = "+216"+this.props.route.params.number //==> props.phone_number ==> props from component Chek_Phone_Number&Send_Code 
    axios.post("http://localhost:3000/verifSms/verifyCode", {number,code:value})
    .then(result =>{
      console.log(result)
      if(result.data == 'success'){
        this.props.navigation.navigate('UselessTextInput',{
          number:number
        });
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
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: -20, marginBottom: 20 }}>
          <Text style={{ color: "#505050", fontSize: 35, marginBottom: 10 }}>
            Enter Your Code
          </Text>
          <View>
            <Text style={styles.textNum}> 
              +216{this.props.route.params.number}
              <Text
                style={styles.textResend}
                onPress={() => console.log("RESEND")} //=> ResendSms()
              >
                {"   "}
                RESEND
              </Text>
            </Text>
          </View>
        </View>
        <KeycodeInput
          value={this.state.code}
          length={6}
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
      fontSize: 18
    },
    textResend: {
      color: "#BBBBBB",
    },
});