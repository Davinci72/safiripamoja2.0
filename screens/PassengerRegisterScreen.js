import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet,Text,TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import axios from 'axios';

const PassengerRegisterScreen = () =>{
    const navigation = useNavigation();
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const handlePassengerSignup = ()=> {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials=>{
            createSafiriProfile();
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
    const createSafiriProfile = (e)=>{
        axios.post('https://kajiadorevenue.info/SupaTribe/registerPassenger', {
            fullnames: names,
            phone:phone,
            id_number:idNumber,
            email:email
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          //navigate to a error page
            console.log(error);
        });
    }
    return(
        <View
        style={styles.container}
        behavior="padding"
        >
            <Text style={{fontWeight:"bold",fontSize:30}}>Register As Passenger</Text>
            <View style={styles.inputContainer}>
            <TextInput
                placeholder='Enter Full Names'
                value={ names }
                onChangeText={ text =>setNames(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter Phone Number'
                value={ phone }
                onChangeText={ text =>setPhone(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter ID Number'
                value={ idNumber }
                onChangeText={ text =>setIdNumber(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter Email'
                value={ email }
                onChangeText={ text =>setEmail(text)}
                style={styles.input}
                />
            <TextInput
            placeholder='Password'
            value={ password }
            onChangeText={ text =>setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
            </View>
                 
            <View style={styles.buttonInputContainer}>
       
                <TouchableOpacity
                onPress={handlePassengerSignup}
                style={styles.button}
                >
                    <Text style={styles.buttonText} >Passenger Register</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PassengerRegisterScreen;

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
input:{
backgroundColor:"white",
paddingHorizontal:15,
paddingVertical:10,
borderRadius:10,
marginTop:5,
},
inputContainer:{
width:"80%"
},
buttonInputContainer:{
width:"60%",
justifyContent:'center',
alignItems:'center',
marginTop:40,
},
button:{
backgroundColor:"#0782F9",
width:"100%",
padding:15,
borderRadius:10,
alignItems:'center'
},
buttonOutline:{
backgroundColor:"white",
marginTop:5,
borderColor:"#0782F9",
borderWidth:2,
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