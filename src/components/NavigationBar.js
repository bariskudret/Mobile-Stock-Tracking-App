import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings } from '../context/SettingsContext';

const NavigationBar = ({ navigation }) => {
  const { setIsSettingsVisible } = useSettings();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Product')}
      >
        <MaterialIcons name="inventory" size={24} color="#666" />
        <Text style={styles.navText}>Product</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialIcons name="person" size={24} color="#666" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('SelectBranch')}
      >
        <MaterialIcons name="business" size={24} color="#666" />
        <Text style={styles.navText}>Branch</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={() => setIsSettingsVisible(true)}
      >
        <MaterialIcons name="settings" size={24} color="#666" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});

export default NavigationBar;