
import React,{Component} from 'react';
import { View,ScrollView,Text,StyleSheet,Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from 'expo-status-bar';

export default class PetsDashboard extends Component   {
    
    render() {
        return (
          <View>
                <View style={styles.MenuTop}>
                    <Text style={styles.Elementop}>Dashboard</Text>
                    <Text style={styles.Elementoptitle}></Text>
                    <Text style={styles.ElementopSearch}>
 
                        <MaterialCommunityIcons name="magnify" color={'#576574'} size={'50'} />
                    </Text>
                    
                </View>
                <View style={styles.Menu}>
                <View style={styles.ElemenBottomactive}>
                <Image style={styles.logomenu} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
                    <Text style={styles.ElemenBottomText}>Pets</Text>
                </View>
                <View style={styles.ElemenBottom}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://www.pngfind.com/pngs/m/261-2613166_plus-icon-linkedin-logo-hd-png-download.png' }} />
                    <Text style={styles.ElemenBottomText}>Add</Text>
                </View>
                <View style={styles.ElemenBottom}>
                <Image style={styles.logomenubutton} source={{ uri: 'https://i.ibb.co/vQT2Vgr/output-onlinepngtools-1.png' }} />
                    <Text style={styles.ElemenBottomText}>Remove</Text>
                </View>
                </View>
                <View>
                    <View style={styles.CardsRow}>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://i.ibb.co/drQ4yRW/dog.jpg' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Jack</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 5 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Male</Text>
                            </View>
                        </View>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://lafeber.com/pet-birds/wp-content/uploads/2020/04/gamaliel-troubleson-u9PsLITXMCQ-unsplash-e1587001975887-300x271.jpg' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Tweety</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 8 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Female</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.CardsRow}>
                        <View style={styles.card}>
                        <Image style={styles.photoCard} source={{ uri: 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2020-07/kitten-510651.jpg?h=f54c7448&itok=ZhplzyJ9' }} />
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Name : </Text>
                                <Text style={styles.titleCard}> Kitty</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Age : </Text>
                                <Text style={styles.titleCard}> 2 months</Text>
                            </View>
                            <View style={styles.rowInfoCar}>
                                <Text style={styles.infocard}>Gender : </Text>
                                <Text style={styles.titleCard}> Female</Text>
                            </View>
                        </View>
                        
                    </View>
                    
                </View>
                <StatusBar style="auto" />
            </View>
        );
    }
    
}
var styles = StyleSheet.create({
    CardsRow:{
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row',
        paddingLeft:-20,
        paddingRight:20,
    },
    card:{
        fontSize:100,
        flex:1,
        paddingBottom:7,
        marginLeft:30,
        borderColor:'#c8d6e5',
        borderWidth:1,
        borderRadius:10
    },
    photoCard:{
        height:140
    },
    infocard:{
        fontSize:16,
        fontWeight:200,
        flex:1
    },
    titleCard:{
        fontSize:16,
        textAlign:'center',
        marginRight:8,
        flex:1
    },
    rowInfoCar:{
        paddingTop:8,
        paddingBottom:1,
        flexDirection:'row',
        paddingLeft:2,
        marginLeft:7
    },
    MenuTop:{
        backgroundColor:'white',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row' 
    },
    Menu:{
        backgroundColor:'white',
        paddingTop:15,
        paddingBottom:4,
        flexDirection:'row',
    },
    Elementop:{       
        color:'black',
        textAlign:'center',
        fontSize:25,
        fontWeight:400,
        marginLeft:30,
        marginTop:4
        
    },
    Elementoptitle:{       
        color:'black',
        textAlign:'center',
        fontSize:20,
        flex:1
        
    },
    ElementopSearch:{       
        color:'#c8d6e5',
        textAlign:'center',
        fontSize:28,
        marginRight:40
    },
    ElemenBottom:{       
        color:'black',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        flex:1,
        borderBottomColor:'#c8d6e5',
        borderBottomWidth: 1
    },
    ElemenBottomactive:{       
        color:'black',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        flex:1,
        borderBottomColor:'#5EC2E0',
        borderBottomWidth: 1
    },
    ElemenBottomText:{
        fontSize:23,
        fontWeight:100,
        marginBottom:10
    },
    logomenu:{
        alignContent:'center',
        alignItems:'center',
        height:40,
        width:40,
        borderRadius:50
    },
    logomenubutton:{
        alignContent:'center',
        alignItems:'center',
        height:35,
        width:35,
        borderRadius:50,
        marginBottom:7
    }
});