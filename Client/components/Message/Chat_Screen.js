import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TextInput, FlatList, Dimensions, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
import {io} from "socket.io-client"


export default class Chat extends Component {

  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      messages: [{id:1, sent: true,  msg: 'Lorem ipsum dolor',   image:'https://randomuser.me/api/portraits/men/38.jpg'},
      {id:2, sent: true,  msg: 'sit amet, consectetuer',   image:'https://randomuser.me/api/portraits/men/38.jpg'},
      {id:3, sent: false, msg: 'adipiscing elit. Aenean ', image:'https://randomuser.me/api/portraits/women/92.jpg'},
      {id:4, sent: true,  msg: 'commodo ligula eget dolor.',   image:'https://randomuser.me/api/portraits/men/38.jpg'},
      {id:5, sent: false, msg: 'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes', image:'https://randomuser.me/api/portraits/women/92.jpg'},
      {id:6, sent: true,  msg: 'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo',   image:'https://randomuser.me/api/portraits/men/38.jpg'},
      {id:7, sent: false, msg: 'rhoncus ut, imperdiet', image:'https://randomuser.me/api/portraits/women/92.jpg'},
      {id:8, sent: false, msg: 'a, venenatis vitae', image:'https://randomuser.me/api/portraits/women/92.jpg'},], //=> Fake Data
    };

    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
    this.renderItem   = this._renderItem.bind(this);

  }

  reply() {
    var messages = this.state.messages;
    messages.push({
      id:Math.floor((Math.random() * 100) + 1),
      name:"Bent Sawaf",
      sent: false,
      msg: this.state.msg,
      image:'https://randomuser.me/api/portraits/women/92.jpg'
    });
    this.setState({msg:'', messages:messages});
  }

  send() {
    if (this.state.msg.length > 0) {
      this.socket.emit('chat_message.send',{msg:this.state.msg,id:this.id})
    }
  }

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

  componentDidMount(){
    this.id=Math.floor((Math.random() * 100) + 1)
    this.socket = io("http://127.0.0.1:3000");
    this.socket.on("chat_new_message", ({msg,id}) => {
      if(id == this.id){
        var bool = true;
        var name = "Bent Sawaf"
        var img ='https://randomuser.me/api/portraits/women/92.jpg'
      }else{
        var bool =false
        var name = "el 3atif"
        var img = 'https://randomuser.me/api/portraits/men/38.jpg'
      }
          this.setState({ messages: [...this.state.messages, {
            id:this.id,
            name:name,
            sent: bool,
            msg: msg,
            image:img
          }]   
     });
  });

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
            source={{ uri: "https://randomuser.me/api/portraits/women/92.jpg" }}
            style={styles.headerPic}
          />
          <Text style={styles.headerName}>Bent Sawaf</Text>
        </View>

        <KeyboardAvoidingView style={styles.keyboard}>
          <FlatList
            style={styles.list}
            extraData={this.state}
            data={this.state.messages}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={this.renderItem}
          />
          <View style={styles.footer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Write a message..."
                underlineColorAndroid="transparent"
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
  // image: {
  //   width,
  //   height,
  // },
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