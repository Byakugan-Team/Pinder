
import React,{Component} from 'react';
import { View,ScrollView,Text,StyleSheet,Image,Button,TouchableOpacity,TextInput,ImageBackground , Dimensions} from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default class PetsScreen extends Component   {

         state={
             
            ScreenHeight : Dimensions.get("window").height
        } 
    
        render(){
            return(
                <View>
                    <View style={styles.Galleriecontainer}>
                        <ImageBackground style={styles.photoBack}  source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} >
                            
                        </ImageBackground>
                    </View>
                    <View style={styles.MenuTop}>
                        <Text style={styles.Elementoptitle}>Jack</Text>
                        <Button style={styles.ElementopSearch} title={'Modify'} />
                    </View>
                </View>
            )
        }
}

var styles = StyleSheet.create({
    MenuTop:{
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row' ,
        backgroundColor:"white"
    },
    Elementoptitle:{       
        color:'black',
        fontSize:28,
        flex:1
        
    },
    ElementopSearch:{  
        fontSize:28,
        marginRight:40
    },
    Galleriecontainer:{
        marginLeft:5,
        marginRight:5
    },
    photoBack:{
        height:Dimensions.get("window").height/2,
        marginTop:50
    }

})