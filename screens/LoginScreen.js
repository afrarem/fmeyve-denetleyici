import {StyelSheet, Text, View, SafeAreaView, Pressable, Button,Linking} from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'expo';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as AppAuth from "expo-app-auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const LoginScreen=()=>{
    const navigation= useNavigation();
    useEffect(()=>{
        const checkTokenValidity = async()=>{
            const accessToken= await AsyncStorage.getItem("token");
            const expirationDate = await AsyncStorage.getItem("expirationDate");
            console.log("acess token", accessToken);
            console.log("expiration date",expirationDate);

            if(accessToken && expirationDate){
                const currentTime = Date.now();
                if(currentTime < parseInt(expirationDate)){
                    navigation.replace("Main");
                }else{
                    AsyncStorage.removeItem("token");
                    AsyncStorage.removeItem("expirationDate");
                }
            }
        }
        checkTokenValidity();

    },[])
    async function authenticate (){
   
       const result =await AppAuth.authAsync(config);
       console.log(result);
       if(result.accessToken){
        const expirationDate=new Date(result.accessTokenExpirationDate).getTime();
        AsyncStorage.setItem("token",result.accessToken);
        AsyncStorage.setItem("expirationDate",expirationDate.toString());
        navigation.navigate("Main");
       }
    }
    return(
        <View colors={["#040306", "#131624"]} style={{flex:1, backgroundColor:"rgb(106, 90, 205)"}}> 
            <SafeAreaView>
        <View style={{height:40}}/>
        
        <Text style={{
                color:"white",
                fontSize:30,
                fontWeight:"bold",
                textAlign:"center",
                marginTop: 10,

            }}
            ><Entypo style={{textAlign:"center"}}name="diyet" size={60} color="white" />
            <Text>  Uygulamanın ismi! </Text>
        
        </Text>
        <View style={{height: 80}}/>
        <Pressable
        onPress={authenticate}
        style={{
            backgroundColor:"white",
            padding:10,
            marginLeft:"auto",
            marginRight:"auto",
            width:300,
            borderRadius:25,
            alignItems:"center",
            justifyContent:"center",
            marginVertical:10
        }}
        >
            <Text>Hoşgeldiniz!</Text>

        </Pressable>
        
        <Pressable style={{
            backgroundColor:"#131624",
            padding:10,
            marginLeft:"auto",
            marginRight:"auto",
            width:300,
            borderRadius:25,
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"white",
            borderWidth:0.8,
        }}>
        <MaterialIcons name="camera" size={24} color="white" />
        <View style ={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>
        <Button title='Kamera'></Button>
        </View>
       
        </Pressable>
        
        
        <Pressable style={{
            backgroundColor:"#131624",
            padding:10,
            marginLeft:"auto",
            marginRight:"auto",
            width:300,
            borderRadius:25,
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"white",
            borderWidth:0.8,
        }}>
        <MaterialIcons name="phone-android" size={24} color="white" />
        <View style ={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>
        <Button title='Hakkımızda' onPress={() => navigation.navigate("ProfileScreen")}></Button>
        {/* onPress={() => navigation.navigate("ProfileScreen")} */}
        </View>
        

        </Pressable>
        <Pressable style={{
            backgroundColor:"#131624",
            padding:10,
            marginLeft:"auto",
            marginRight:"auto",
            width:300,
            borderRadius:25,
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"white",
            borderWidth:0.8,
        }}>
        <AntDesign name="mail" size={24} color="white" />
        <View style ={{fontWeight:"500", color:"white", textAlign:"center", flex:1}}>
        <Button title='İletişim' onPress={ ()=>{ Linking.openURL('https://www.google.com/intl/tr/gmail/about/')}}></Button>
        </View>
        
        </Pressable>
    </SafeAreaView>
    </View>
       
    )
}
export default LoginScreen
//const styles = StyelSheet.create({})