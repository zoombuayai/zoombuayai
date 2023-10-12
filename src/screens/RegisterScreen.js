import { View, 
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert
   } from 'react-native';
import React, { useState } from 'react';
import InputComponent from '../components/InputComponent';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [phone, setPhone] = useState('');
    const auth = FIREBASE_AUTH;
    
    const signUp = async () => {
      try {
          if (password !== conPassword) {
              Alert.alert('Password does not match the confirm password');
              return;
          }
  
          const response = await createUserWithEmailAndPassword(auth, email, password);
          const userDocRef = await setDoc(doc(FIREBASE_DB, 'users', response.user.uid), {
              phone: phone,
          });
  
          navigation.navigate("ThankScreen");
          console.log(response);
          console.log(`User added to Firestore with UID: ${response.user.uid}`);
          // Alert.alert('Check your email for confirmation!');
      } catch (error) {
          console.log(error);
      }
  }
  
    return (
        <SafeAreaView style={styles.droidSafeArea} className="h-full">
          <KeyboardAvoidingView behavior='position' className="flex items-center">
          <View className="flex items-center mt-16">
            <Text className="text-5xl font-bold">Create Your</Text>
            <Text className="text-5xl font-bold">Account</Text>
            <Text className="text-xs text-gray-400">Welcome back! please enter your details</Text>
          </View>
    
         
          <InputComponent
            name="Email"
            icon="mail"
            placeholder="Enter your email"
            style="ml-3"
            value={email}
            onChangeText={email => setEmail(email)}
            />
       
          <InputComponent
            name="Phone number"
            icon="call"
            placeholder="Enter your phone number"
            style="ml-3"
            value={phone}
            onChangeText={phone => setPhone(phone)}
            />
       
          <InputComponent
            name="Password"
            icon="lock-closed"
            placeholder="Enter your password"
            style="ml-3"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry="secureTextEntry"
            />
       
          <InputComponent
            name="Confirm password"
            icon="lock-closed"
            placeholder="Enter your confirm password"
            style="ml-3"
            value={conPassword}
            onChangeText={conPassword => setConPassword(conPassword)}
            secureTextEntry="secureTextEntry"
            />

            <View className="flex items-center">
            <TouchableOpacity
             className="border-white w-[160px] mt-5 flex items-center py-[9px] rounded-[10px] bg-[#6F6AF8]"
             >
              <Text className="text-white text-xl" onPress={() => signUp()}>Register</Text>
             </TouchableOpacity>
            </View>
    
          </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    droidSafeArea: {
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
  })
  

export default RegisterScreen