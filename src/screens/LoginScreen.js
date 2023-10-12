import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { FIREBASE_AUTH } from "../../config";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,  } from "firebase/auth";
const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth,email,password);
      console.log(response);
      navigation.navigate("Home");
    }catch(error){
      console.log(error);
      alert("Email or password is incorrect");
    }
  }
  
  const ForgetPassword = () => {
   if(!email){
    alert("Please fill the email.")
   }else  {
    sendPasswordResetEmail(auth, email).then(() => {
      alert("Password reset email sent!");
    }) .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        alert("Please enter a valid email address.");
      } else {
        console.log(errorCode);
      }
    });
   }
  } 

  return (
    <SafeAreaView className="p-5 h-full bg-white">
      <View className="flex items-center mt-24">
        <Text className="text-5xl font-bold">Second</Text>
        <Text className="text-5xl font-bold">Swap</Text>
      </View>
      <View className="flex items-center">
        <InputComponent
          name="Email"
          icon="lock-closed"
          placeholder="Enter your email"
          style="mt-10"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />

        <InputComponent
          name="Password"
          icon="lock-closed"
          placeholder="Enter your password"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry="secureTextEntry"
        />
        
        <ButtonComponent
          style="mt-10"
          name="Login"
          onPress={() => signIn()}
        />
      

        <Text className="mt-4" onPress={() => ForgetPassword()} >Forgot Password?</Text>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
