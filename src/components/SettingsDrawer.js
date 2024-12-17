
import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from '../context/NavigationContext';

import { getUser } from '../services/api/User';

const SettingsDrawer = () => {
  
  const { isSettingsVisible, setIsSettingsVisible } = useNavigation();
  //navigation = isSettingsVisible;
  const [drawerAnimation] = useState(new Animated.Value(-300));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isSettingsVisible) {
      openDrawer();
    } else {
      closeDrawer();
    }
    const fetchData = async()=>{
    const userid = await AsyncStorage.getItem('userId');
    const userResponse = await getUser(userid);
    if(userResponse.ok){
        const userData = userResponse.data;
        setUser(userData);
        console.log(userData)
    }
    

    
    }
    fetchData();

  }, [isSettingsVisible]);

  const openDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerAnimation, {
      toValue: -300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      setIsSettingsVisible(false);
      isSettingsVisible.navigate('Login');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  if (!isSettingsVisible) return null;

  return (
    <>
      <Animated.View style={[styles.drawer, { left: drawerAnimation }]}>
        <View style={styles.drawerHeader}>
          <MaterialIcons name="settings" size={40} color="#333" />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{'ID: '+user?.id || 'Kullanıcı'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>
          </View>
        </View>

        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="lock" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Şİfre Değişitir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="notifications" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Bildirimler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="help" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Yardım & Destek</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.drawerItem, styles.logoutItem]} 
            onPress={handleLogout}
          >
            <MaterialIcons name="exit-to-app" size={24} color="#FF3B30" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <TouchableOpacity 
        style={styles.overlay} 
        onPress={() => setIsSettingsVisible(false)} 
        activeOpacity={1}
      />
    </>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 250,
    borderRadius: 15,
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
  },
  drawerHeader: {
    padding: 25,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 15,
    marginTop:40,
  },
  userName: {
    fontSize: 16,
    padding:2,
    margin:5,
    
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 60,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 26,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    marginLeft: 13,
    fontSize: 16,
    color: '#333',
  },
  logoutItem: {
    position: 'absolute',
    bottom:0,
    top:0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF3B30',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
  },
});

export default SettingsDrawer;