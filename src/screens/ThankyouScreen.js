import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from '@react-navigation/native';
const ThankyouScreen = () => {


    const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex-row items-end justify-center mt-40">
        <Text className="text-6xl font-bold">Thank you</Text>
      </View>
      <View className="justify-center items-center mt-7">
        <Text className="text-gray-500 font-semibold text-md">
          Thanks for signing up. Welcome to our
        </Text>
        <Text className="text-gray-500 font-semibold text-md">
          community. We are happy to have
        </Text>
        <Text className="text-gray-500 font-semibold text-md"> you on board.</Text>
      </View>
     <View className="flex items-center">
     <ButtonComponent
          style="mt-10"
          name="Sign In"
          onPress={() => navigation.navigate("Login")}
        />
     </View>
    </SafeAreaView>
  );
};

export default ThankyouScreen;
