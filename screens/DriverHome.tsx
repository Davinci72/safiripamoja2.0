import {StackActions , useNavigation } from '@react-navigation/native';
import React, { useEffect,useRef, useState } from 'react';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet,Text, TouchableOpacity, View,TextInput, Dimensions } from 'react-native';
import { auth } from '../firebase';
import * as Location from 'expo-location';
import { GooglePlaceDetail,GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from './environments';
import Constants from "expo-constants"
import MapViewDirections from "react-native-maps-directions";
import { Input, Button, Block, theme } from 'galio-framework';
import axios from 'axios';

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: -1.3792264,
    longitude: 36.9419451,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }
  type InputAutocompleteProps = {
    label: string;
    placeholder?: string;
    onPlaceSelected: (details: GooglePlaceDetail | null) => void;
  };

  function InputAutocomplete({
    label,
    placeholder,
    onPlaceSelected,
  }: InputAutocompleteProps) {
    return (
      <>
        <Text>{label}</Text>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder={placeholder || ""}
          fetchDetails
          onPress={(data, details = null) => {
            onPlaceSelected(details);
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </>
    );
  }

const NotificationsScreen = () =>{
    const [location, setLocation]=useState({});
    const [devLat, setDeviceLat] = useState(0);
    const [devLong, setDeviceLong] = useState(0);
    const user = auth.currentUser;
    useEffect(()=>{
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
    
    const checkPayment = (phone) =>{
      axios.get('https://kajiadorevenue.info/SupaTribe/getPayment/'+phone+'/')
      .then(response => {
        if(response.data.length === 0){
          console.log('phone'+phone)
        }
        else{
          navigation.dispatch(
              StackActions.push('Driver Home')
            )
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
      const getUserDesignation = () =>{
        axios.get('http://kajiadorevenue.info/SupaTribe/getDesignation/'+user.email+'/')
        .then(response => {
          console.log(response.data[0]);
          if(response.data[0].role === "1"){
            getUserPaymentStatus();
            // navigation.dispatch(
            //   StackActions.push('Driver Dashboard')
            // )
            
          }
          else{
            navigation.dispatch(
              StackActions.push('Home')
            ) 
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    getUserDesignation();
      (async()=>{
          let {status} = await Location.requestForegroundPermissionsAsync();
          if(status == 'granted'){
              console.log('Permision successfull')
          }
          else{
              console.log('Permision not granted')
          }
          const loc = await Location.getCurrentPositionAsync();
          console.log(loc.coords.latitude);
          setDeviceLat(loc.coords.latitude);
          setDeviceLong(loc.coords.longitude);
          setLocation(loc);
      })()
  },[]);


    const [origin, setOrigin] = useState<LatLng | null>();
    const [destination, setDestination] = useState<LatLng | null>();
    const [showDirections, setShowDirections] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [availableSeats, setAvailableSeats] = useState('');
    const[dateOfTravel,setDateOfTravel] = useState('');
    const [amountPerSeat,setAmount] = useState('');
    const [destinationLocationName,setDestinationLocationName] = useState('');
    const [pickUpPoint,setPickUpPoint] = useState("");
    const [pickUpPointLat,setPickUpPointLat] = useState(0);
    const [pickUpPointLong,setPickUpPointLong] = useState(0);
    const mapRef = useRef<MapView>(null);
    //save location and driver details to database

    const pushToremoteDataBase = async(e) =>{
      e.preventDefault();
      axios.post('https://kajiadorevenue.info/SupaTribe/createTrip/', {
            deviceLatitude: devLat,
            deviceLongitude:devLong,
            destination:destination,
            destinationName:destinationLocationName,
            pickUpPoint:pickUpPoint,
            pickUpPointLat:pickUpPointLat,
            pickUpPointLong:pickUpPointLong,
            travelDistance:distance,
            duration:duration,
            driver:user.email,
            seats:availableSeats,
            dateOfTravel:dateOfTravel,
            amountPerSeat:amountPerSeat,
        })
            .then(function (response) {
                console.log(response.data);
                navigation.dispatch(
                  StackActions.replace('Success Trip')
                )
            })
            .catch(function (error) {
                console.log(error);
            });
      
    }
    const edgePaddingValue = 70;

    const edgePadding = {
      top: edgePaddingValue,
      right: edgePaddingValue,
      bottom: edgePaddingValue,
      left: edgePaddingValue,
    };
    const traceRouteOnReady = (args: any) => {
      if (args) {
        // args.distance
        // args.duration
        setDistance(args.distance);
        setDuration(args.duration);
      }
    };
    const traceRoute = () => {
      if (origin && destination) {
        setShowDirections(true);
        mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
      }
    };
    const onPlaceSelected = (
      details: GooglePlaceDetail | null,
      flag: "origin" | "destination"
    ) => {
      const set = flag === "origin" ? setOrigin : setDestination;
      const position = {
        latitude: details?.geometry.location.lat || 0,
        longitude: details?.geometry.location.lng || 0,
      };
      set(position);
      moveTo(position);
      if(flag === "destination"){
        // console.log('Destination ' +details);
        setDestinationLocationName(details.name);
      }
      if(flag ==='origin'){
        console.log(JSON.stringify(details.name))
        setPickUpPointLat(details?.geometry?.location.lat);
        setPickUpPoint(details.name);
        setPickUpPointLong(details?.geometry?.location.lng);

      }
    };  
    const moveTo = async (position: LatLng) => {
      const camera = await mapRef.current?.getCamera();
      if (camera) {
        camera.center = position;
        mapRef.current?.animateCamera(camera, { duration: 1000 });
      }
    };

    useEffect(()=>{
        (async()=>{
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status == 'granted'){
                console.log('Permision successfull')
            }
            else{
                console.log('Permision not granted')
            }
            const loc = await Location.getCurrentPositionAsync();
            console.log(loc.coords.latitude);
            setLocation(loc);
        })()
    },[])
    const navigation = useNavigation();
  
    const handleSignout = ()=>{
        auth.signOut()
        .then(()=>{
            navigation.dispatch(
              StackActions.replace('Login')
            )
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    return(
      <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
    latitude: -1.3792264,
    longitude: 36.9419451,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  }}
      >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} /> }
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#6644ff"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>
      <View style={styles.searchContainer}>
        {/* <InputAutocomplete
          label="Origin"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        /> */}
        <InputAutocomplete
          label="Destination"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
          }}
        />

        <InputAutocomplete
          label="Pick Up Point"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "origin");
          }}
        />
        <Input
        style={{height: 40}}
        placeholder="Enter Date / Time Of Travel (yyyy-m-d)"
         onChangeText={newText => setDateOfTravel(newText)}
        defaultValue={dateOfTravel}
        />
        <Input
        style={{height: 40}}
        placeholder="Enter Available Seats"
        onChangeText={newText => setAvailableSeats(newText)}
        defaultValue={availableSeats}
        />
        <Input
        style={{height: 40}}
        placeholder="Enter Amount Per Seats"
        onChangeText={newText => setAmount(newText)}
        defaultValue={amountPerSeat}
        />
        <TouchableOpacity style={styles.button} onPress={pushToremoteDataBase}>
          <Text style={styles.buttonText}>Create Trip</Text>
        </TouchableOpacity>
        {distance && duration ? (
          <View>
            <Text>Distance: {distance.toFixed(2)}</Text>
            <Text>Duration: {Math.ceil(duration)} min</Text>
          </View>
        ) : null}
      </View>
    </View>
    )
}

export default NotificationsScreen;


const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
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
        width:"90%",
        backgroundColor:"white",
        shadowColor:"black",
        shadowOffset:{width:2, height:2},
        shadowOpacity:0.5,
        shadowRadius:4,
        elevation:4,
        padding:8,
        borderRadius:8,
        top:Constants.statusBarHeight,

    }
});