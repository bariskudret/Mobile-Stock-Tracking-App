import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from '../services/api/User'; // API çağrısı
import {getBranches} from '../services/api/Branch';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null); // Kullanıcı bilgileri burada tutulacak

  useEffect(() => {
    // AsyncStorage'dan userId'yi alıyoruz
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
        console.log(userId)
      if (userId.toString()) {
        // Kullanıcı ID'si ile API'ye istek atıyoruz
        getUser(userId).then(response => {
          if (response.ok) {
            setUser(response.data); // Kullanıcı bilgilerini state'e at
          } else {
            console.error('Kullanıcı bilgileri alınamadı:', response.message);
          }
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Profil Bilgileri</Text>
          <Text>Kullanıcı Adı: {user.username}</Text>
          <Text>Kullanıcı ID: {user.id}</Text>
          {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
        </>
      ) : (
        <Text>Yükleniyor...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default ProfileScreen;