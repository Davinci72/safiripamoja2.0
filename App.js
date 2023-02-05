import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterInitScreen from './screens//RegisterScreen';
import PassengerRegisterScreen from './screens/PassengerRegisterScreen';
import DriverRegisterScreen from './screens/DriverSignupScreen';
import DriverRegisterScreenIdBack from './screens/DriverSigngUpUploadBackIdScreen';
import DriverRegisterScreenLicense from './screens/DriverSigngUpUploadLicense';
import DriverRegisterScreenSelfie from './screens/DriverSigngUpUploadSelfie';
import DriverRegisterForm from './screens/DriverRegisterForm';
import DriverDashboard from './screens/DriverDashboard';
import Pay from './screens/Pay';
import DriverHome from './screens/DriverHome';
import TripSuccessScreen from './screens/TripSuccessScreen';
import DriverSignupUploadVehichle from './screens/DriverSignupUploadVehichle';
import SelectVehichleType from './screens/SelectVehichleType';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
      <Stack.Screen options={{headerShown:false}} name="Select Registration" component={RegisterInitScreen} />
      <Stack.Screen options={{headerShown:false}} name="Passenger Signup" component={PassengerRegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Driver Signup" component={DriverRegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Upload Id Back" component={DriverRegisterScreenIdBack} />
      <Stack.Screen options={{headerShown:false}} name="Upload Driving License" component={DriverRegisterScreenLicense} />
      <Stack.Screen options={{headerShown:false}} name="Driver Selfie" component={DriverRegisterScreenSelfie} />
      <Stack.Screen options={{headerShown:false}} name="Driver Details" component={DriverRegisterForm} />
      <Stack.Screen name="Driver Dashboard" component={DriverDashboard} />
      <Stack.Screen name="Pay" component={Pay} />
      <Stack.Screen name="Success Trip" component={TripSuccessScreen} />
      <Stack.Screen name="Upload Vehichle" component={DriverSignupUploadVehichle} />
      <Stack.Screen  name="Driver Home" component={DriverHome} /> 
      <Stack.Screen  name="Select Vehichle Type" component={SelectVehichleType} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
