
import React,{Component} from 'react';
import { StyleSheet,  View , AsyncStorage} from 'react-native';
import LoginScreen from './LoginScreen'
import server_IP from '../config/Server_IP'
const Web3 = require('web3');


export default class HomeScreen extends Component {
    _logIn = async () => {
        try {
          const token = await AsyncStorage.getItem('Pinder_token');
          if (token !== null) {


            fetch(`http://${server_IP}:3000/users/logIn`,{
            body: JSON.stringify({token}),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(async (result)=>{
            result = await result.json();
            if(result.success){
                this.props.navigation.navigate('Globalmenu')
            }
        })
        .catch((e) => console.log(e));



         console.log(token);
          }
        } catch (error) {
          console.log(error)
        }
      };
      _logout = async () => {
        try {
        await AsyncStorage.removeItem('Pinder_token');
        } catch (error) {
          // Error retrieving data
        }
      };
    componentDidMount(){

        this._logIn()
    }
    componentWillMount() {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('http://'+server_IP+':7545')
      );
      fetch('http://'+server_IP+':3001/PinderCoin.json',{
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET'
      })
      .then(async (result)=>{
        result = await result.json();
        console.log(result)
      })

     .then((result)=>{
       console.log(result)
     })
    }
    render(){
        return (
            <View style={styles.container}>
                <LoginScreen navigation={this.props.navigation}>
    
                </LoginScreen>
                
            </View>
    
        )
    }
}
const styles = StyleSheet.create({
    container: {

      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#22afc3'
    },
  });
  
  