
import React,{Component} from 'react';
import { StyleSheet,  View , AsyncStorage} from 'react-native';
import LoginScreen from './LoginScreen'
import server_IP from '../config/Server_IP'

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
                this.props.navigation.navigate('PetsDashboard')
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
  
  