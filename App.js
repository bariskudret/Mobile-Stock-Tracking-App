import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProvider } from './src/context/NavigationContext';
import { SafeAreaView, StatusBar, View , Modal } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductScreen from './src/screens/ProductScreen';
import SelectBranchScreen from './src/screens/SelectBranchScreen';
import SettingsDrawer from './src/components/SettingsDrawer';
import NavigationBar from './src/components/NavigationBar';
import FilterDrawer from './src/components/FilterDrawer';
import { useNavigation } from './src/context/NavigationContext';
import AddProductScreen from './src/screens/AddProductScreen';

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
      name="AddProduct" 
      component={AddProductScreen}
      options={{ 
        headerShown: true ,
        contentStyle: { backgroundColor: '#fff' }
      }}
      
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
            <GlobalModals />{/*global modal bileşenleri eklendi*/}
            <SettingsDrawer navigation={navigation}/>
          </View>
        </NavigationContainer>
      </NavigationProvider>
    </SafeAreaView>
  );
}

// Global modal bileşeni
const GlobalModals = () => {
  const { isFilterVisible, setIsFilterVisible } = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterVisible}
      onRequestClose={() => setIsFilterVisible(false)}
    >
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'flex-end' 
      }}>
        <FilterDrawer 
        />
      </View>
    </Modal>
  );
};