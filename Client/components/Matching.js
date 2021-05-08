
import React,{Component} from 'react';
import { StyleSheet,  Text,View , AsyncStorage,ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import server_IP from '../config/Server_IP'
import Demo from '../assets/demo'
import styles from '../assets/stylesMatching'
import Icon from  '../assets/Icon'
import CardItem from './CardItem'
import * as Font from 'expo-font';


export default class Matching extends Component {
    state = {
        fontsLoaded: false,
        city:"Tunis",
        UserId:0,
        pets:[]
    }
    City()  {
        return (
          <TouchableOpacity style={styles.city}>
            <Text style={styles.cityText}>
              <Icon name="marker" /> {this.state.city}
            </Text>
          </TouchableOpacity>
        );
      };
       Filters () {
        return (
          <TouchableOpacity style={styles.filters}>
            <Text style={styles.filtersText}>
              <Icon name="filter" /> Filters
            </Text>
          </TouchableOpacity>
        );
      };
      getUserInfo = async () => {
        try {
          const token = await AsyncStorage.getItem("Pinder_token");
          console.log(token)
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
                  this.setState({ UserId: result.user.id });
                  this.GetPetsInfo()
                }
              })
              .catch((err) => console.log("err", err));
          }
        } catch (error) {
          console.log(error);
        }
      };
      GetPetsInfo(){
        var UserId=this.state.UserId
        fetch('http://'+server_IP+':3000/pets/GetAllMatching/'+UserId,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET'
        })
        .then(async (result)=>{
            result = await result.json();
            this.setState({pets:result})
        })
        .catch((e) => console.log(e));
    }
     componentDidMount(){
        Font.loadAsync( {
            'tinderclone': require('../assets/fontFamily/tinderclone.ttf')
        }
        ).then( () => this.setState( { fontsLoaded: true } ) )
        
     }
    render(){
        if( !this.state.fontsLoaded ) {
            return <View/>
        }
        return(
            <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.bg}
          >
            <View style={styles.containerHome}>
              <View style={styles.top}>
                {this.City()}
                {this.Filters()}
              </View>
      
              <CardStack
                loop={true}
                verticalSwipe={false}
                renderNoMoreCards={() => null}
                ref={swiper => (this.swiper = swiper)}
              >
                {this.state.pets.map((item, index) => (
                  <Card key={index}>
                    <CardItem
                      image={item.picture_name}
                      NickName={item.nickname}
                      Gender={item.gendre}
                      Age={item.birth}
                      Category={item.category}
                      owner={'achref'}
                      status={'online'}
                      actions
                      onPressLeft={() => this.swiper.swipeLeft()}
                      onPressRight={() => this.swiper.swipeRight()}
                    />
                  </Card>
                ))}
              </CardStack>
            </View>
          </ImageBackground>
        )
    }
}
