import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/api/User';

const SettingsScreen = ({ navigation }) => {
  const [drawerAnimation] = useState(new Animated.Value(-300));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await getUser(userId);
        if (response.ok) {
          setUser(response.data);
        }
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? -300 : 0;
    Animated.timing(drawerAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.replace('Login');
    } catch (error) {
      console.error('Çıkış hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer}>
          <MaterialIcons name="settings" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      <Animated.View style={[styles.drawer, { left: drawerAnimation }]}>
        <View style={styles.drawerHeader}>
          <MaterialIcons name="person" size={40} color="#333" />
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.userId}>ID: {user.id}</Text>
            </View>
          )}
        </View>

        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="settings" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="notifications" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Bildirimler</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="help" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Yardım & Destek</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerItem}>
            <MaterialIcons name="lock" size={24} color="#333" />
            <Text style={styles.drawerItemText}>Change Password</Text>
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

      {isDrawerOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={toggleDrawer} 
          activeOpacity={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#fff',
    zIndex: 2,
    elevation: 5,
  },
  drawerHeader: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    marginTop: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  userId: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 12,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  logoutItem: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  logoutText: {
    marginLeft: 16,
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

export default SettingsScreen;