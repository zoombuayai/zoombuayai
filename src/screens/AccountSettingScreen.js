import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchConponent from "../components/SearchConponent";
import { Ionicons } from "@expo/vector-icons";
import InputComponent from "../components/InputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from "../../config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getMetadata } from '@firebase/storage';
import * as ImagePicker from 'expo-image-picker';
const AccountSettingScreen = () => {
  const navigation = useNavigation();
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [showImg, setShowImage] = useState(null);
  const auth = FIREBASE_AUTH;
  const storage = FIREBASE_STORAGE;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // ดึงข้อมูลผู้ใช้จาก Firestore และกำหนดให้กับ state
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
          setUserId(user.uid);
          
          setEmail(user.email || "");
          setPhone(userData.phone || "");
  
          // ดึงรูปภาพจาก Storage เมื่อผู้ใช้ล็อกอิน
          showImage();
        }
      }
    });
  
    return () => unsubscribe();
  }, [auth, navigation, showImage,userId]);
  

  const updateUser = async () => {
    const userRef = doc(FIREBASE_DB, 'users', userId);
    try {
      await updateDoc(userRef, {
        // email: email,
        phone: phone,
        // password: password,
      });
      alert('อัปเดตข้อมูลเรียบร้อยแล้ว');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล:', error);
      alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
  }

  const pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const file = await response.blob();

      const storage = FIREBASE_STORAGE;
      const storageRef = ref(storage, 'Profile/' + userId);

      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file');
        showImage();
      })
    }
  }

  const showImage = () => {
    const storage = FIREBASE_STORAGE;
    getDownloadURL(ref(storage,'Profile/' + userId))
    .then((url) => {
      console.log(url);
      setShowImage(url);
    })
  }

  return (
    <SafeAreaView
    style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }}
    >
        <KeyboardAvoidingView behavior='position'>
      <SearchConponent />
      <View className="px-5 py-7">
        <Text className="text-2xl font-bold text-center">Account Setting</Text>
        <View className="mt-8 flex items-center relative">
          <View>
            <Image
              className="w-28 h-28 rounded-full overflow-hidden"
              source={{
                uri:  showImg ? showImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }}
            />
            <View className="bg-blue-500 p-1 rounded-full absolute bottom-0 right-1">
              <Ionicons onPress={() => pickImage()} name="pencil-sharp" size={20} color="white" />
            </View>
          </View>
        </View>

        <View className="flex items-center">
          <InputComponent
            name="Email"
            icon="mail"
            style="ml-3"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          {/* <InputComponent
            name="Password"
            icon="lock-closed"
            style="ml-3"
            value={password}
            onChangeText={(password) => setPassword(password)}
          /> */}
          <InputComponent
            name="Phone"
            icon="call"
            style="ml-3"
            value={phone}
            onChangeText={(phone) => setPhone(phone)}
          />
        </View>
          <View className="flex-row justify-around">
          <ButtonComponent
            style="mt-10"
            name="Back"
            onPress={() => navigation.goBack()}
            />
          <ButtonComponent
            style="mt-10"
            name="Save"
            onPress={() => updateUser()}
            />
            </View>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountSettingScreen;
