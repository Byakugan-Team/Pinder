import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { KeycodeInput } from 'react-native-keycode'
import {MyText} from '../Tag_Modules/MyText'


export default class CheckVerification extends Component {

  state = {
    code: "",
  };

  ResendSms() {
  const number = "" //==> props.phone_number ==> props from component Chek_Phone_Number&Send_Code 
    axios.post("http://localhost:3000/verifSms/send", {number})
    .then(result =>{
      console.log(result);
    }).catch(err =>{console.log(err)})
    console.log(number)
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={{ marginLeft: -20, marginBottom: 20 }}>
          <MyText style={{ color: "#505050", fontSize: 35, marginBottom: 10}}>
            Enter Your Code
          </MyText>
          <View>
            <MyText style={styles.textNum}> 
              +21699391220 
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
          onChange={(code) => {
            this.setState({ code: code });
          }}
          onComplete={(value) => {
            this.props.navigation.navigate('UselessTextInput')
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