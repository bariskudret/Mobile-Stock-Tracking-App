import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/ProductScreen';  // Ana ekranı daha sonra oluşturabilirsin
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductScreen from './src/screens/ProductScreen';
import SelectBranchScreen from './src/screens/SelectBranchScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name ="Profile" component={ProfileScreen} />
        <Stack.Screen name = "SelectBranch" component={SelectBranchScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}