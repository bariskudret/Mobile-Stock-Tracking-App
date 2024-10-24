import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import User from '../modals/User';
import {postUser} from '../services/api/User';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    
    if(username.trim().length > 0 && password.trim().length > 0){
      
        const user =   new User()
        .setUsername(username)
        .setPassword(password);
        user.role = 'role';

        postUser(
          user
        ).then(
            response=>{
                if(response.ok)
                {
                  console.log(response);

                      // Kullanıcı ID'sini AsyncStorage'a kaydediyoruz
                  AsyncStorage.setItem('userId', response.data.id.toString());

                  navigation.navigate('Profile');  // Başarılı giriş sonrası ana ekrana yönlendirme
                }
                else console.error(response); 
            }
        );
    }
    
   
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      
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
      
      <TouchableOpacity style={styles.loginButton} onPress={handleRegistration}>
        <Text style={styles.loginButtonText}>Kayıt Ol</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log('Şifremi Unuttum!')}>
        <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
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
});

export default RegisterScreen;