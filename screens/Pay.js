import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { View, Text,TextInput, StyleSheet } from "react-native";
import { useState,useEffect } from 'react';
import { Input, Button, Block, theme } from 'galio-framework';
import axios from 'axios';
import { auth } from '../firebase';


export default function Pay() {
    const [phone, setPhone] =useState("") ;
    const navigation = useNavigation();
    const initiatePayment = async(e)=>{
        e.preventDefault();
        
        // Passing configuration object to axios
        // Invoking get method to perform a GET request
        // axios.post(`https://kajiadorevenue.info/Jenga/test`).then((response) => {
        //     console.log(response.data);
        // });
        // console.log(text);
        axios.post('https://kajiadorevenue.info/Jenga/sendPush', {
            phone: text,
            amount:100,
            acc:"qwerty"
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    
     }
     useEffect(() => {
      //fetch pick up point
      const intervalId = setInterval(async() => {
        const user = auth.currentUser;
        const getUserPaymentStatus = () =>{
           axios.get('https://kajiadorevenue.info/SupaTribe/getDesignation/'+user.email+'/')
           .then(response => {
             checkPayment(response.data[0].phone)
             navigation.navigate('Driver Home')
             console.log(response.data[0]);
           })
           .catch(error => {
             console.log(error);
           },200);
       }
       const checkPayment = (phone) =>{
        axios.get('https://kajiadorevenue.info/SupaTribe/getPayment/'+phone+'/')
        .then(response => {
          if(response.data.length === 0){
            console.log('phone'+phone)
          }
          else{
            navigation.navigate('Driver Home');
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    getUserPaymentStatus();
          
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);
     


  const [text, setText] = useState('');
   return (
    <View style={{padding: 10}}>
    <Input
      style={{height: 40}}
      placeholder="Enter Phone Number"
      onChangeText={newText => setText(newText)}
      defaultValue={text}
    />
    <Button color="info" size="large" onPress={initiatePayment}>Submit</Button>
    <Text style={{padding: 10, fontSize: 42}}>
      {text}
    </Text>
  </View>
   );
 }
