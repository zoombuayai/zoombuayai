import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, TouchableOpacity, Image } from "react-native";

import WelcomeScreen from "./src/screens/WelcomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/bottomTap/HomeScreen";
import ProfileScreen from "./src/bottomTap/ProfileScreen";
import PostScreen from "./src/bottomTap/PostScreen";
import SettingScreen from "./src/bottomTap/SettingScreen";
import AccountSettingScreen from "./src/screens/AccountSettingScreen";
import ThankyouScreen from "./src/screens/ThankyouScreen";
import CartScreens from "./src/screens/CartScreens";
// สร้าง Stack Navigator
const Stack = createStackNavigator();
const Tap = createMaterialBottomTabNavigator();

// สร้าง createMaterialBottomTabNavigator
function TapNavigator() {
  return (
    <Tap.Navigator initialRouteName="Homes">
      <Tap.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => {
            let iconColor = focused ? '#6F6AF8' : color; 
            return (
              <Image
                source={require("./assets/pic_nav_bottom/settings.png")}
                style={{ width: 26, height: 26, tintColor: iconColor }}
              />
            );
          },
        }}
      />

      <Tap.Screen
        name="Post"
        component={PostScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => {
            let iconColor = focused ? '#6F6AF8' : color; 
            return (
              <Image
                source={require("./assets/pic_nav_bottom/post.png")}
                style={{ width: 26, height: 26, tintColor: iconColor }}
              />
            );
          },
        }}
      />

      <Tap.Screen
        name="Homes"
        component={HomeScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => {
            let iconColor = focused ? '#6F6AF8' : color; 
            return (
              <Image
                source={require("./assets/pic_nav_bottom/home.png")}
                style={{ width: 26, height: 26, tintColor: iconColor }}
              />
            );
          },
        }}
      />

      <Tap.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: null,
          tabBarIcon: ({ color, focused }) => {
            let iconColor = focused ? '#6F6AF8' : color; 
            return (
              <Image
                source={require("./assets/pic_nav_bottom/user.png")}
                style={{ width: 26, height: 26, tintColor: iconColor }}
              />
            );
          },
        }}
      />
    </Tap.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={TapNavigator}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="AccountScreen"
          component={AccountSettingScreen}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="ThankScreen"
          component={ThankyouScreen}
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="Cart"
          component={CartScreens}
          options={{
            headerShown: true,
          }}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
