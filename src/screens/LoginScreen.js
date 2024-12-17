import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import User from '../modals/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostLoginUser} from '../services/api/User';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async() => {
    try{
    console.log(`Username: ${username}, Password: ${password}`);
    

      user = new User()
      .setUsername(username)
      .setPassword(password)
      
    const response = await PostLoginUser(user);

    console.log(JSON.stringify(response.data) , response.ok);

    if(response.ok){

      await AsyncStorage.setItem('userId' , response.data.id.toString());
      navigation.navigate('Profile');  // Başarılı giriş sonrası yönlendirme
    }
     else {
      Alert.alert('Hata', data.error || 'Giriş başarısız');
    }
    }catch(error){
      throw new error;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log('Şifremi Unuttum!')}>
        <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
      </TouchableOpacity>

      <TouchableOpacity 
          style={styles.registerLinkText}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerLinkText}>
            Hesabınız yoksa Kayıt olun
          </Text>
        </TouchableOpacity>
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
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#4CAF50',
    fontSize: 14,
  },
  registerLinkText:{
    color: '#4CAF50',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    margin: 13
  }
});

export default LoginScreen;

