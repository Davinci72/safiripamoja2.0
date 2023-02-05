import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import MapView, {LatLng, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { GOOGLE_API_KEY } from './environments';
import * as Location from 'expo-location';
import Directions  from "react-native-maps-directions";
import { GooglePlaceDetail,GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet,Text, TouchableOpacity, View,TextInput, Dimensions } from 'react-native';
import axios from 'axios';
import { auth } from '../firebase';
import {Picker} from '@react-native-picker/picker';
const NotificationsScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState();
    //get user lat and longitude
    const [devLat, setDeviceLat] = useState(0);
    const [location, setLocation]=useState({});
    const [driverDetails, setDriverDetails] = useState({});
    const [getDriverScreenDisplay,setDriverScreen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 0,
        longitude: 0
      });
    const [marker1, setMarker1] = useState({
    latitude: 0,
    longitude: 0
    });
    const [marker2, setMarker2] = useState({
    latitude: 0,
    longitude: 0
    });
    const [devLong, setDeviceLong] = useState(0);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getUserDesignation = () =>{
      axios.get('http://kajiadorevenue.info/SupaTribe/getDesignation/'+user.email+'/')
      .then(response => {
        // console.log(user.email);
        // return;
        if(response.data[0].role === "1"){
          navigation.dispatch(
            navigation.navigate('Driver Dashboard')
          )
          
        }
        else{
          // navigation.dispatch('Home');
          
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  getUserDesignation();
    //fetch pick up point
    const intervalId = setInterval(async() => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status == 'granted'){
            // console.log('Permision successfull at map')
        } 
        else{
            // console.log('Permision not granted')
        }
        const loc = await Location.getCurrentPositionAsync();
        // console.log(loc.coords.latitude);
        setDeviceLat(loc.coords.latitude);
        setDeviceLong(loc.coords.longitude);
        setLocation(loc);
        if(location){
            setRegion({
                latitude: loc.coords.latitude + 0.001,
                longitude: loc.coords.longitude + 0.001,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
            //   console.log(marker1);
            // console.log(location);
          }else{
            setRegion({
                latitude: region.latitude + 0.001,
                longitude: region.longitude + 0.001,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              });
          }
      
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

   const getDriver= (details) => {
    // console.log(details);
      axios.get('http://kajiadorevenue.info/SupaTribe/getDriver/'+details.name+'/')
      .then(response => {
          // console.log(response.data);
          // console.log(driverDetails);
          setDriverDetails(response.data);
          // console.log(parseFloat(response.data[0].PickUpPoitLong));
          setMarker2({latitude:parseFloat(response.data.trip_details[0].destinationLatitude),longitude:parseFloat(response.data.trip_details[0].destinationLongititude)});
           setMarker1({latitude:parseFloat(response.data.trip_details[0].pickUpPointLat),longitude:parseFloat(response.data.trip_details[0].PickUpPoitLong)});
      })
      .catch(error => {
        console.log(error);
      });
    }
    const getDriverScreen = (driverDetails)=>{
      setDriverScreen(true);
      // navigation.navigate('Driver Trip Details')
    }
const showDestination = (details)=>{
  //console.log(details); return;
    getDriver(details);
    setSelectedLocation({
      latitude: details?.geometry.location.lat,
      longitude: details?.geometry.location.lng
    });
    //console.log(details.name); //check if driver exists
    // console.log(details);
}
  return (
    <View style={styles.container}>
    <MapView
      region={region}
      style={styles.map}
    >
    <Marker coordinate={region} title="You are Here" />
    {selectedLocation.latitude !== 0 && (
      <Marker
        title="Your Destination"
        pinColor={"blue"}
        coordinate={selectedLocation}
      />
    )}

    {marker1.latitude !== 0 &&(
      <Marker
        title={"Pick Up Point :"}
        pinColor={"black"}
        coordinate={marker1}
        onPress={()=>getDriverScreen()}
      />
    )}
    {/* { marker1 != 0 &&  (console.log(marker1))} */}
     {marker2.latitude !== 0 &&  (<Directions
      origin={marker1}
      destination={marker2}
      apikey={GOOGLE_API_KEY}
      strokeWidth={3}
      strokeColor="#222"
    />)}
    </MapView>
    <View style={styles.searchContainer}>
        <Text style={{paddingTop:20}}>Select Vehichle Type</Text>
        <Picker
            selectedValue={selectedLanguage}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Truck" value="truck" />
            <Picker.Item label="PickUp" value="pickup" />
            <Picker.Item label="Personal Car" value="psv" />
            <Picker.Item label="Motor Bike" value="motorbike" />
            </Picker>
    <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Enter Destination"
          fetchDetails
          renderDescription={(row) => row.description}
          onPress={(data, details = null) => {
            showDestination(details)
            // onPlaceSelected(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      
        </View>
        {getDriverScreenDisplay !== false  && (
          <View style={styles.driverView}>
          <View style={styles.image}>
            <Text>Image View</Text>
          </View>
          <Text>Driver Name : {driverDetails.driver_details[0].names}</Text>
          <Text>Driver Phone : {driverDetails.driver_details[0].phone}</Text>
          <Text>Pick Up Point : {driverDetails.trip_details[0].pickUpPoint}</Text>
          <Text>Vehichle Type : {driverDetails.driver_details[0].vtype}</Text>
          <Text>Destination : {driverDetails.trip_details[0].destinationName}</Text>
          <Text>Available Seats : {driverDetails.trip_details[0].seats}</Text>
        </View>
        )}
    </View>
  );
};

export default NotificationsScreen;
const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    driverView:{
      backgroundColor:'white',
      width:"90%",
      height:"60%",
      padding:20
    },
    image:{
      backgroundColor:"blue",
      width:50,
    },
    input:{
        borderColor:"#888",
        borderWidth:1,
        },
    inputContainer:{
        width:"95%",
        top:15,
        },
    button:{
        backgroundColor:"#0782F9",
        width:"100%",
        padding:15,
        borderRadius:10,
        alignItems:'center',
        marginTop:40,
        },
    
    buttonText:{
    color:"white",
    fontWeight:"700",
    fontSize:16
    },
    map: {
        width: '100%',
        height: '90%',
        top:30
      },
    textview:{
        position:'absolute',
    },
    searchContainer:{
        position:'absolute',
        top:40,
        width:"90%",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOffset:{width:2, height:2},
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:4,
        padding:8,
        borderRadius:8,
    }
});