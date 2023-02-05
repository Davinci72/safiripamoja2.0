import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground ,KeyboardAvoidingView, StyleSheet,Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import { useHeaderHeight } from '@react-navigation/elements';

const LoginScreen = () =>{
    const height = useHeaderHeight();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    useEffect(()=>{
       const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                console.log(user);
                navigation.replace('Home');
                // getUserDesignation();
            }
        })
        return unsubscribe;
    })

    const handleSignup = ()=>{
        // auth
        // .createUserWithEmailAndPassword(email,password)
        // .then(userCredentials=>{
        //     const user = userCredentials.user;
        //     console.log(user.email);
        // })
        // .catch(error => alert(error.message))
        navigation.navigate('Select Registration');
    }
    const handleSignin = () => {
        auth
        .signInWithEmailAndPassword(email,password)
        .then(userCredentials=>{
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
    
    return(
        <View
        style={styles.container}
        behavior="padding"
        >
             <ImageBackground 
                source={require('../assets/app_launcher.png')}
                style={{width: "90%", height: "60%", position:'absolute',top:100}} 
            />
           
            <View style={styles.inputContainer}>
           
                <TextInput
                placeholder='Email'
                placeholderTextColor={'white'}
                value={ email }
                onChangeText={ text =>setEmail(text)}
                style={styles.input}
                />
                <TextInput
                placeholder='Password'
                placeholderTextColor={'white'}
                value={ password }
                onChangeText={ text =>setPassword(text)}
                style={styles.input}
                secureTextEntry
                />
            </View>
            <View style={styles.buttonInputContainer}>
                <TouchableOpacity
                onPress={handleSignin}
                style={styles.button}
                >
                    <Text style={styles.buttonText} >Login</Text>

                </TouchableOpacity>

                <TouchableOpacity
                onPress={handleSignup}
                style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
input:{
borderColor:"red",
borderWidth:2,
paddingHorizontal:15,
paddingVertical:10,
borderRadius:10,
marginTop:5,
backgroundColor: 'rgba(52, 52, 52, 0.6)'
},
inputContainer:{
top:340,
width:"80%",
height:"60%"
},
buttonInputContainer:{
width:"80%",
justifyContent:'center',
alignItems:'center',
marginTop:10,
backgroundColor:"white",
backgroundColor: 'rgba(0, 0, 255, 0.0)',
},
button:{
backgroundColor: 'rgba(0, 0, 255, 0.6)',
width:"100%",
padding:15,
borderRadius:10,
alignItems:'center'
},
buttonOutline:{
marginTop:5,
borderColor:"#0782F9",
borderWidth:2,
backgroundColor: 'rgba(255, 255, 255, 0.7)',
},
buttonOutlineText:{
    color:"#0782F9",
    fontWeight:'700',
    fontSize:16
},
buttonText:{
color:"white",
fontWeight:"700",
fontSize:16
}
});