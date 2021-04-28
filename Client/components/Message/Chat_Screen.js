import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {AsyncStorage, ScrollView, StyleSheet, Text, View, Image, TextInput, FlatList, Dimensions, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
import {io} from "socket.io-client"
import server_IP from '../../config/Server_IP'

export default class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      messages: [],
      MyUser: {},
      Myfriend: {},
      scrollViewmessages:{}
    };

    this.send = this.send.bind(this);
    this.renderItem   = this._renderItem.bind(this);

  };


  send() {
    if (this.state.msg.length > 0) {
      this.socket.emit("chat_message.send", {
        msg: this.state.msg,
        senderid: this.state.MyUser.id,
        receiverID: this.state.Myfriend.id,
      });
      this.setState({ msg: "" });
    }
  };


  _renderItem = ({item}) => {
    if (item.sent === false) {
      return (
        <View style={styles.eachMsg}>
          <Image source={{ uri: item.image}} style={styles.userPic} />
          <View style={styles.msgBlock}>
            <Text style={styles.msgTxt}>{item.msg}</Text>
          </View>
        </View>
      );
    } else{
      return (
        <View style={styles.rightMsg} >
          <View style={styles.rightBlock} >
            <Text style={styles.rightTxt}>{item.msg}</Text>
          </View>
          <Image source={{uri: item.image}} style={styles.userPic} />
        </View>
      );
    }
  };


  _logIn = async () => {
    try {
      const token = await AsyncStorage.getItem('Pinder_token');
      if (token !== null) {
        fetch(`http://${server_IP}:3000/users/logIn`,{
        body: JSON.stringify({token}),
        headers: {'content-type': 'application/json'},
        method: 'POST',
    }).then(async (result)=> {
        result = await result.json();
        if(result.success){
            this.setState({MyUser: result.user});
            this.Friend_Info()}
    }).catch((err) => console.log('err',err));
      }
    } catch (error) { console.log(error) }
  };


  Friend_Info(){
    if(this.state.MyUser.id == 5){
      var id = 7
    }else{
      var id = 5 //=> The id is hardcoded to try the functionality, then it will be the props.id which will come through the Chat_List screen.
    }
    fetch(`http://${server_IP}:3000/users/${id}`,{
      headers: { 'content-type': 'application/json' },
      method: 'GET',
  }).then(async (result)=>{
      result = await result.json();
      if(result.success){
          this.setState({Myfriend: result.user})
          this.GetMessages()};
  }).catch((e) => console.log(e));
  };


  GetMessages(){
    const userId = this.state.MyUser.id;
    const friendId =this.state.Myfriend.id;
    fetch(`http://${server_IP}:3000/messages/Getmesssage`,{
      body:JSON.stringify({myid: userId, friendid: friendId}),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
  }).then(async (result)=>{
    result = await result.json();
    console.log(result)
    var messagesAll = []
    for(var i =0 ; i<result.length;i++){
        var element = result[i]
          if(element.sender_id == this.state.MyUser.id){
        var message =   {
              id:this.state.MyUser.id,
              name:this.state.MyUser.first + ' ' + this.state.MyUser.last,
              sent: true,
              msg: element.message,
              image:this.state.MyUser.photo
            
          }
        }else{
          var message =   {
            id:this.state.Myfriend.id,
            name:this.state.Myfriend.first + ' ' + this.state.Myfriend.last,
            sent: false,
            msg: element.message,
            image:this.state.Myfriend.photo
          
        }
        }
        messagesAll.push(message)
    };
    
    this.setState({messages:messagesAll})
    this.socketioConnection()
    this.state.scrollViewmessages.scrollToEnd({ animated: true }); 
})
.catch((e) => console.log(e));
  }
  socketioConnection(){
    var roomId = Math.max(this.state.MyUser.id,this.state.Myfriend.id).toString() + Math.min(this.state.MyUser.id,this.state.Myfriend.id).toString()
    this.socket = io("http://"+server_IP+":3000",{query: `roomId=${roomId}`});

    this.socket.on("chat_new_message", ({msg,id}) => {
      if(id == this.state.MyUser.id){
        var bool = true;
        var name = this.state.MyUser.first + ' ' + this.state.MyUser.last
        var img = this.state.MyUser.photo
      }else{
        var bool =false
        var name = this.state.Myfriend.first + ' ' + this.state.Myfriend.last
        var img = this.state.Myfriend.photo
      }
          this.setState({ messages: [...this.state.messages, {
            id:id,
            name:name,
            sent: bool,
            msg: msg,
            image:img
          }]
          
     });
     this.state.scrollViewmessages.scrollToEnd({ animated: true }); 
  });
  }
  componentDidMount(){
    this._logIn()
    
   

  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://img.icons8.com/ios/30/000000/left.png" }}
            style={styles.backIcon}
          />
          <Image
            source={{ uri: this.state.Myfriend.photo }}
            style={styles.headerPic}
          />
          <Text style={styles.headerName}>{this.state.Myfriend.first + ' ' + this.state.Myfriend.last}</Text>
        </View>
        <KeyboardAvoidingView style={styles.keyboard}>
        <ScrollView
  ref={(view) => {
    this.setState({scrollViewmessages:view})
  }}
>
          <FlatList
            style={styles.list}
            extraData={this.state}
            data={this.state.messages}
            keyExtractor={(item) => {
              return Math.random().toString();
            }}
            renderItem={this.renderItem}
          />
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
                value={this.state.msg}
                onChangeText={(msg) => this.setState({ msg })}
              />
            </View>

            <TouchableOpacity
              style={styles.btnSend}
              blurOnSubmit={false}
              onPress={() => this.send()}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/small/75/ffffff/filled-sent.png",
                }}
                style={styles.iconSend}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <StatusBar style="auto" />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    marginTop: 25,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#FAFAFA',
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#00BFFF",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  backIcon: {
    height: 25,
    width: 20,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  headerPic :{
    height: 42,
    width: 42,
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  headerName :{
    fontWeight: 'bold',
    color: '#000000',
  },
  msgBlock: {
    width: 220,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 20,
    backgroundColor: '#00BFFF',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
}); 