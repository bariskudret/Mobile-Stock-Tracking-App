import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import NavigationBar from '../components/NavigationBar';
import SettingsDrawer from '../components/SettingsDrawer';
import { SettingsProvider } from '../context/SettingsContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              header: ({ navigation }) => <NavigationBar navigation={navigation} />
            }}
          />
          <Stack.Screen 
            name="Product" 
            component={ProductScreen}
            options={{
              header: ({ navigation }) => <NavigationBar navigation={navigation} />
            }}
          />
        </Stack.Navigator>
        <SettingsDrawer /> {/* Her zaman erişilebilir olması için navigation stack dışında */}
      </NavigationContainer>
    </SettingsProvider>
  );
};