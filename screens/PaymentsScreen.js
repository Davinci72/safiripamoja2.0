import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

const PaymentsScreen = () =>{
    const navigation = useNavigation();
    const handleSignout = ()=>{
        auth.signOut()
        .then(()=>{
            navigation.replace('Login')
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    return(
        <View style = {styles.container}>
            <Text>Payments Screen</Text>
           <Text>Email : {auth.currentUser?.email}</Text> 
           <TouchableOpacity
           style={styles.button}
           onPress={handleSignout}>
                <Text
                style={styles.buttonText}>Sign Out</Text>
           </TouchableOpacity>
        </View>
    )
}

export default PaymentsScreen;


const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    button:{
        backgroundColor:"#0782F9",
        width:"60%",
        padding:15,
        borderRadius:10,
        alignItems:'center',
        marginTop:40,
        },
    buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:16
    }
});