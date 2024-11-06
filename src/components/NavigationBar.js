import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '../context/NavigationContext';

const NavigationBar = ({ navigation }) => {
  const { setIsSettingsVisible } = useNavigation();

  const handleSettingsPress = () => {
    setIsSettingsVisible(true); // Settings sayfasına yönlendirmek yerine drawer'ı açıyoruz
  };

  return (
    <View style={styles.navbar}>
            <TouchableOpacity 
        style={styles.navItem} 
        onPress={handleSettingsPress}  // Yeni handler'ı kullanıyoruz
      >
        <MaterialIcons name="settings" size={24} color="#666" />
        <Text style={styles.navText}>Ayarlar</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Product')}
      >
        <MaterialIcons name="inventory" size={24} color="#666" />
        <Text style={styles.navText}>Ürünler</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialIcons name="business" size={24} color="#666" />
        <Text style={styles.navText}>Ana Sayfa</Text>
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