import { useNavigation } from '@react-navigation/native';
import { ImageBackground,StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';

const RegisterInitScreen = () =>{
    const navigation = useNavigation();

    const passengerSignup = ()=> {
        navigation.navigate('Passenger Signup');
    }
    const driverSignup = ()=> {
        navigation.navigate('Driver Details');
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
            <View style={styles.buttonInputContainer}>
                <TouchableOpacity
                onPress={passengerSignup}
                style={styles.button}
                >
                    <Text style={styles.buttonText} >Register As A Passenger</Text>

                </TouchableOpacity>

                <TouchableOpacity
                onPress={driverSignup}
                style={[styles.button,styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register As A Driver</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterInitScreen;

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
top:200,
width:"90%",
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