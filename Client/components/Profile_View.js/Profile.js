import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions,TouchableOpacity,AsyncStorage} from "react-native";
import { StatusBar } from "expo-status-bar";
import CarouselCards from "./CarouselCards";
import server_IP from "../../config/Server_IP";

const { width, height } = Dimensions.get('window');


export default class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id : (this.props.route.params.id_user) ? this.props.route.params.id_user : 0, //=> hardcoded
      _button: "nothing",

      Myuser_id:0,
      user_info: {},
      user_pets: [],
    };
  }
  getUserInfoxx = async () => {
    try {
      const token = await AsyncStorage.getItem("Pinder_token");
      console.log('dsfdsf')
      if (token !== null) {
        fetch(`http://${server_IP}:3000/users/logIn`, {
          body: JSON.stringify({ token }),
          headers: { "content-type": "application/json" },
          method: "POST",
        })
          .then(async (result) => {
            result = await result.json();
            
            if (result.success) {
                console.log(result.user)
              this.setState({ Myuser_id: result.user.id });
              this.CheckState()
            }
          })
          .catch((err) => console.log("err", err));
      }
    } catch (error) {
      console.log(error);
    }
  };
  sendInvitation(){
    const { user_id,Myuser_id } = this.state
    fetch(`http://${server_IP}:3000/Friends/sendInvitation`, {
      body: JSON.stringify({ sender:Myuser_id,receiver:user_id }),
        headers: { "content-type": "application/json" },
        method: "POST",
      })
        .then(async (result) => {
          result = await result.json();
          
        })
        .catch((err) => console.log(err));
  }

  acceptInvit(){
    this.setState({_button:'friends'})
    const { user_id,Myuser_id } = this.state
    fetch(`http://${server_IP}:3000/Friends/acceptInvitation`, {
      body: JSON.stringify({ receiver:Myuser_id,sender:user_id }),
        headers: { "content-type": "application/json" },
        method: "POST",
      })
        .then(async (result) => {
          result = await result.json();
          
        })
        .catch((err) => console.log(err));
  }
  CheckState(){
    const { user_id,Myuser_id } = this.state
    fetch(`http://${server_IP}:3000/Friends/CheckState`, {
      body: JSON.stringify({ Myuser:Myuser_id,otherUser:user_id }),
        headers: { "content-type": "application/json" },
        method: "POST",
      })
        .then(async (result) => {
          result = await result.json();
          console.log(result)
          this.setState({ _button : result.state });
          
        })
        .catch((err) => console.log(err));
  }
componentDidMount(){
  this.getUserInfoxx()
  this.getUser_Pets()
  this.getUserInfo()
}  

getUserInfo() {
  const { user_id } = this.state
  fetch(`http://${server_IP}:3000/users/${user_id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    })
      .then(async (result) => {
        result = await result.json();
        if (result.success) {
          this.setState({ user_info: result.user });
        }
      })
      .catch((err) => console.log(err));
  };


getUser_Pets() {
  const { user_id } = this.state
  fetch(`http://${server_IP}:3000/pets/GetAll/${user_id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    })
      .then(async (result) => {
        result = await result.json();
        // console.log(result)
        if (result) {
          this.setState({ user_pets: result });
        }
      })
      .catch((err) => console.log(err));
};

_request () {
  const { _button } = this.state
  if(_button == "nothing"){
    return (
      <TouchableOpacity
      blurOnSubmit={false}
      onPress={()=> this.sendInvitation()}>
      <Image style={{width:width/8, height:height/15}} source={require("../../assets/Profile_View/Send_Invit.png")}/>
      </TouchableOpacity>
    );
  };
  if(_button == "friends"){
    return (
      <TouchableOpacity
      blurOnSubmit={false}
      onPress={() =>
        this.props.navigation.navigate("chatScreen", {
          FriendId: this.state.user_id,
        })
      }>
      <Image style={{width:width/8, height:height/15}} source={require("../../assets/Profile_View/Start_Chat.png")}/>
      </TouchableOpacity>
    );
  };
  if(_button == "receiverInvit"){
    return (
      <TouchableOpacity
            blurOnSubmit={false}
            onPress={()=> this.acceptInvit()}>
            <Image style={{width:width/8, height:height/15}} source={require("../../assets/Profile_View/Accept.png")}/>
            </TouchableOpacity>
    );
  };
  if(_button == "senderInvit"){
    return (
      <TouchableOpacity
      blurOnSubmit={false}
      disabled
      onPress={()=>{console.log("send invit")}}>
      <Image style={{width:width/8, height:height/15}} source={require("../../assets/Profile_View/Waiting.png")}/>
      </TouchableOpacity>
    );
  };
};


  render() {
    // console.log("pets",this.state.user_pets)

    const { user_info, user_pets } = this.state;
    console.log(this.state._button)
    return (
      <View style={styles.container}>
        <View style={{ height: 80, backgroundColor: "#F0F0F0" }}>
          <Text style={styles.name}>{`${user_info.first} ${user_info.last}`}</Text>
        </View>
        <ImageBackground style={{width: width, height: height}} source={require("../../assets/Profile_View/bg.png")}>
        <ScrollView>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.avatar}
                source={{
                  uri: user_info.photo,
                }}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(4)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-pets-30.png")}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(200)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-puzzle-matching-50.png")}
              />
            </View>
          </View>
          <View style={{marginStart: width/4.5,}}>
            {this._request()}
             </View>
          <View style={styles.body}>
            <CarouselCards pets={user_pets} />
          </View>
        </ScrollView >
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },
  name: {
    paddingTop: 40,
    marginStart: 15,
    color: "#363636",
    fontWeight: "bold",
      fontSize: 25,
      textAlign: "left",
       
    },
  
  count: {
    alignSelf: "center",
    color: "#757E90",
    fontWeight: "bold",
    fontSize: 16,
  },
  Icon: {
    width: 40,
    height: 40,
  },
  body: {
    alignSelf: "center",
    alignItems: "center",
  },
});
