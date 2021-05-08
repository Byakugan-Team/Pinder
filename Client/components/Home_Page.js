import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  AsyncStorage,
} from "react-native";
import TextField from 'react-native-md-textinput';
import { StatusBar } from "expo-status-bar";
import server_IP from "../config/Server_IP";


const { width, height } = Dimensions.get("window");

export default class Home_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
    defaultCode: "+216",
      phone_Number: "",
      inputLength: 0
    };
  }

  handlePhoneNum = (text) => {
    this.setState({ phone_Number: text, inputLength: text.length });
  };

  sendSms() {
    const number = this.state.defaultCode + this.state.phone_Number;
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
    const { phone_Number, inputLength } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          style={{ width: width, height: height }}
          source={require("../assets/Home_Page/Background.png")}
        >
          <TouchableOpacity
            blurOnSubmit={false}
            onPress={() => console.log("maw")}
          >
            <Image
              style={styles.Img_CatPeek}
              source={require("../assets/Home_Page/CatPeek.png")}
            />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>

            <Image
              style={styles.Logo_TEXT}
              source={require("../assets/Home_Page/Logo_Text.png")}
            />
            <View style={{ marginTop: height / 2.7 }}>
            <Text style={{ fontWeight: "bold", color: "white", fontSize: 11, }}>
              Have a Pets, Have a Pinder
            </Text>
            </View>
          </View>

          <View style={styles.Body}>
            <Text style={{ color: "white", fontSize: 20, }}>Login With</Text>
                <View>

                <TextField
              label={"Phone Number"}
              highlightColor={"white"}
              labelColor={"white"}
              textColor={"white"}
              keyboardType={"numeric"}
              numeric
              value={phone_Number}
              onChangeText={this.handlePhoneNum}
            />
            {inputLength == 8 ? (  
            <TouchableHighlight
              style={styles.buttonClick}
              onPress={() => {
                this.sendSms();
                // this.props.navigation.navigate('CheckVerification',{
                //   firstname:( this.props.route.params && this.props.route.params.firstname) ? this.props.route.params.firstname :'',
                //   lastname:( this.props.route.params && this.props.route.params.lastname) ? this.props.route.params.lastname :'',
                //   photo:( this.props.route.params && this.props.route.params.photo) ? this.props.route.params.photo :'',
                //   email:( this.props.route.params && this.props.route.params.email) ? this.props.route.params.email :'',
                //   number:this.state.phone_Number
                // })
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

                </View>
                <View style={{flexDirection: "row", marginTop:20}}>


   <Image style={{width:width/4.5, height: 30}} source={require("../assets/Home_Page/Line.png")}/>
   <Text style={{ color: "white", fontSize: 20, marginLeft:10, marginRight: 10}}>Or</Text>
   <Image style={{width:width/4.5, height: 30}} source={require("../assets/Home_Page/Line.png")}/>
    
                </View>
            <View style={{ flexDirection: "row", marginTop: height / 50 }}>
              <TouchableOpacity
                blurOnSubmit={false}
                onPress={() => console.log("Google")}
              >
                <Image
                  style={{
                    width: width / 5,
                    height: height / 10,
                    marginRight: width / 17,
                  }}
                  source={require("../assets/Home_Page/Google_Logo.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                blurOnSubmit={false}
                onPress={() => console.log("Facebook")}
              >
                <Image
                  style={{
                    width: width / 5,
                    height: height / 10,
                    marginLeft: width / 17,
                  }}
                  source={require("../assets/Home_Page/Facebook_Logo.png")}
                />
              </TouchableOpacity>

             
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
    alignSelf: "center",
  },
  Img_CatPeek: {
    width: width / 3,
    height: height / 6.5,
    marginTop: height / 5,
    marginStart: -width / 5.8,
    position: "absolute",
  },
  Logo_TEXT: {
    width: width / 2.8,
    height: height / 6.2,
    marginTop: height / 5,
    position: "absolute",
  },
  Body: {
    top: height / 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClick: {
    alignItems: "center",
    // backgroundColor: "#EEEEEE",
    padding: 5,
    borderRadius: 30,
    width: width / 1.8,
    marginLeft: 13,
    borderWidth: 2,
    borderColor: "white",
 },
 disabledButton: {
    alignItems: "center",
    // backgroundColor: "#EEEEEE",
    padding: 5,
    borderRadius: 30,
    width: width / 1.8,
    marginLeft: 13,
 },
 textButton: {
    color: "#FFFFFF",
    fontSize: 25,
 },
});
