import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider } from './src/context/NavigationContext';
import { SafeAreaView, StatusBar, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductScreen from './src/screens/ProductScreen';
import SelectBranchScreen from './src/screens/SelectBranchScreen';
import SettingsDrawer from './src/components/SettingsDrawer';
import NavigationBar from './src/components/NavigationBar';

const Stack = createNativeStackNavigator();

const MainStack = () => (
  <Stack.Navigator 
    initialRouteName="Register"
    screenOptions={{
      header: ({ navigation }) => (
        <NavigationBar 
          navigation={navigation} 
          style={{ marginTop: StatusBar.currentHeight }}
        />
      ),
    }}
  >
 <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Product" 
      component={ProductScreen}
      options={{
        headerShown: true,
        contentStyle: { backgroundColor: '#fff' }
      }}
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{
        headerShown: true,
        contentStyle: { backgroundColor: '#fff' }
      }}
    />
    <Stack.Screen 
      name="SelectBranch" 
      component={SelectBranchScreen}
      options={{
        headerShown: true,
        contentStyle: { backgroundColor: '#fff' }
      }}
    />
  </Stack.Navigator>
);

export default function App({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <NavigationProvider>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <MainStack />
            <SettingsDrawer navigation={navigation}/>
          </View>
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaView>
  );
}