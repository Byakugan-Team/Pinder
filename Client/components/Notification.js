import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://ak.picdn.net/shutterstock/videos/19523383/thumb/3.jpg", name:"Achref Ben Thamer", text:"Achref Ben Thamer Add a new pet", attachment:"https://yt3.ggpht.com/ytc/AAUvwnhFY3d8qOpu-KNOALIzsq4ECnGwTPwWmVVpkdM9Fg=s900-c-k-c0x00ffffff-no-rj"},
        {id:2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVraRaR8WdWiYt0jvbL-h_z_Z01-UmKE0gFg&usqp=CAU", name:"Gaston",     text:"Gaston add a new pet named Momo", attachment:"https://sentientmedia.org/wp-content/uploads/2020/02/LouiseNuts.jpg"},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Nadhem Bacha",  text:"Nadhem Bacha Viste your profile", attachment:""},
        {id:5, image: "https://www.headshotsprague.com/wp-content/uploads/2019/07/Headshots_Prague-emotional-portrait-of-a-smiling-entrepreneur-1.jpg", name:"Mahdi Tounsi",  text:"Nothing", attachment:""},
      ]
    }
  }
  

  render() {

    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View/>;

          let mainContentStyle;
          if(Notification.attachment) {
            mainContentStyle = styles.mainContent;
            attachment = <Image style={styles.attachment} source={{uri:Notification.attachment}}/>
          }
          return(
            <View style={styles.container}>
              <Image source={{uri:Notification.image}} style={styles.avatar}/>
              <View style={styles.content}>
                <View style={mainContentStyle}>
                    <Text style={styles.name}>{Notification.name}</Text>
                  <View style={styles.text}>
                      {Notification.text.length > 30 ? <Text>{`${Notification.text.slice(0, 30)}...`}</Text> : <Text>{Notification.text}</Text>}
                    
                  </View>
                  <Text style={styles.timeAgo}>
                    2 hours ago
                  </Text>
                </View>
                {attachment}
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF"
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "#FFFFFF",
    alignItems: 'flex-start'
  },
  avatar: {
    width:50,
    height:50,
    borderRadius:25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap:'wrap'
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0
  },
  mainContent: {
    marginRight: 60
  },
  img: {
    height: 50,
    width: 50,
    margin: 0
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  timeAgo:{
    fontSize:12,
    color:"#696969"
  },
  name:{
    fontSize:16,
    color:"#1E90FF",
    
  }
}); 