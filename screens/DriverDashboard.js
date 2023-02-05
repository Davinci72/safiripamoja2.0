import { useNavigation } from '@react-navigation/native';
import React, {useEffect }from 'react';
import { StyleSheet, View } from 'react-native';
import { Text,Button  } from 'galio-framework'
import axios from 'axios';
import { auth } from '../firebase';
const DriverDashboard = () => {
    //check for payment
    useEffect(() => {
      //fetch pick up point
      //check upload status
      const intervalId = setInterval(async() => {
        const user = auth.currentUser;
        const getUserPaymentStatus = () =>{
           axios.get('https://kajiadorevenue.info/SupaTribe/getDesignation/'+user.email+'/')
           .then(response => {
             checkPayment(response.data[0].phone)
             if(response.data[0].designation===1){
              console.log("is driver")
             }
             if(response.data[0].designation === 2){
              console.log("passenger");
             }
            //  console.log(response.data[0]);
           })
           .catch(error => {
             console.log(error);
           });
       }
       const getUserUploadStatus = () =>{
        axios.get('https://kajiadorevenue.info/SupaTribe/getUserUploadStatus/'+user.email+'/')
        .then(response => {
          console.log(response.data[0])
          // checkPayment(response.data[0].phone)
          if(response.data[0].status==="0"){
            navigation.navigate('Driver Signup')
           console.log("Upload ID Front")
          }
          if(response.data[0].status==="1"){
            navigation.navigate('Upload Id Back')
           console.log("is driver")
          }
          if(response.data[0].status==="2"){
            navigation.navigate('Upload Driving License')
           console.log("is driver")
          }
          if(response.data[0].status==="3"){
            navigation.navigate('Driver Selfie')
           console.log("is driver")
          }
          if(response.data[0].status==="4"){
            navigation.navigate('Upload Vehichle')
           console.log("is driver")
          }
          if(response.data[0].status==="5"){
            getUserPaymentStatus();
            // navigation.navigate('Driver Dashboard')
            // console.log(response.data.status);
          //  console.log("Payment Screen")
          }
          else{
            console.log(response.data[0].status)
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    getUserUploadStatus();
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
    // getUserPaymentStatus();
          
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }, []);
    const navigation = useNavigation();
    return (
        <View style={[styles.card, styles.shadowProp]}>  
        <View>  
          <Text style={styles.heading}>  
            Safiri Pamoja Create Trip 
          </Text>  
        </View>  
        <Text>  
            To Create Trip And Use Our Services, Pay a monthly subscription fee of KSHS 100, click proceed to continue
        </Text>  
        <View>
            <Button 
            color="#50C7C7" 
            shadowless 
            size="large" 
            onPress={() =>navigation.navigate('Pay')}>Proceed</Button>
        </View> 
      </View>
    );
}

// import StyleSheet from react-native  
const styles = StyleSheet.create({  
    heading: {  
      fontSize: 18,  
      fontWeight: '600',  
      marginBottom: 13,  
    },  
    card: {  
      backgroundColor: 'white',  
      borderRadius: 8,
      marginLeft:10,
      marginRight:10,  
      paddingVertical: 45,  
      paddingHorizontal:10,  
      width: '100%',  
    },  
    shadowProp: {  
      shadowOffset: {width: -2, height: 4},  
      shadowColor: '#171717',  
      shadowOpacity: 0.2,  
      shadowRadius: 3,  
    },  
  });  

export default DriverDashboard;