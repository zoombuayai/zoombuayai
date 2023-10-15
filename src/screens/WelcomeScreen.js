import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../config";
const WelcomeScreen = ({ navigation }) => {

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home')
      }
    })
  });



  return (
    <SafeAreaView style={styles.droidSafeArea} className="h-full bg-white">
      <View className="h-auto flex items-center mt-20">
        <Text className="text-5xl font-bold">Second</Text>
        <Text className="text-5xl font-bold">Swap</Text>
      </View>

      <View className="flex ml-20   mt-16">
        <View className="flex-row">
          <Ionicons name="checkmark" size={25} color="black" />
          <View className="flex-col">
            <Text className="text-lg">It is a place you can </Text>
            <Text className="text-lg">exchange your unused</Text>
            <Text className="text-lg">items with others.</Text>
          </View>
        </View>
      </View>

      <View className="flex ml-20   mt-6">
        <View className="flex-row">
          <Ionicons name="checkmark" size={25} color="black" />
          <View className="flex-col">
            <Text className="text-lg">Whether it's general use, </Text>
            <Text className="text-lg">quality products or things</Text>
            <Text className="text-lg">you need in everyday life.</Text>
          </View>
        </View>
      </View>

      <View className="flex-col items-center mt-10">

        <ButtonComponent 
        name="Sign in"
        onPress={() => navigation.navigate("Login")}
        style="mt-3"
        />

        <ButtonComponent 
        name="Register"
        onPress={() => navigation.navigate("Register")}
        style="mt-3"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  shadowBtn: {
    shadowColor: "#171717",
    elevation: 10,
  },
});

export default WelcomeScreen;
