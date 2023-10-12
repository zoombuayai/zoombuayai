import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import SearchConponent from "../components/SearchConponent";
import InputPostComponent from "../components/InputPostComponent";
import ButtonComponent from "../components/ButtonComponent";
import { FIREBASE_DB, FIREBASE_AUTH, FIREBASE_STORAGE } from "../../config";
import * as ImagePicker from 'expo-image-picker';
import { Image } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

const PostScreen = () => {
  const [userId, setUserId] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedValue, setCategory] = useState("General");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [image, setImage] = useState(null);
 
    // สร้างวันที่ปัจจุบันในรูปแบบ Date
    const currentDate = new Date();

    // สร้าง Timestamp จากวันที่และเวลาปัจจุบัน
    const currentTimestamp = Timestamp.fromDate(currentDate);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if(user){
        setUserId(user.uid);
      }
    });
  });

  async function AddPost() {
    const docRef = await addDoc(collection(FIREBASE_DB, "Posts"), {
      userid : userId,
      productName : productName,
      category : selectedValue,
      price : price,
      detail : detail,
      accountNumber : accountNumber,
      accountName : accountName,
      bankName : bankName,
      createdDate: currentTimestamp, 
      });
      const storage = FIREBASE_STORAGE;
      const response = await fetch(image);
      const file = await response.blob();

      const storageRef = ref(storage, 'ImagePost/' + docRef.id);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file');
        alert('Upload success')
        setProductName("");
        setCategory("");
        setPrice("");
        setDetail("");
        setaccountNumber("");
        setAccountName("");
        setBankName("");
        setImage("");
      })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  }


  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <SearchConponent />
      <View className="px-4 mt-[-5px]">
        <View className="flex-row justify-between items-center">
          <InputPostComponent
            name="ชื่อสินค้า"
            value={productName}
            style="w-44"
            onChangeText={(productName) => setProductName(productName)}
          />
          <View className="mt-2">
            <Text className="text-lg font-bold">เลือกชนิดสินค้า</Text>
            <View className="overflow-hidden border h-10 flex justify-center mt-1 rounded-full w-40">
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                  setCategory(itemValue)
                }
              >
                <Picker.Item label="General" value="General" />
                <Picker.Item label="Electronic" value="Electronic" />
                <Picker.Item label="Sports" value="Sports" />
                <Picker.Item label="Shoes" value="Shoes" />
                <Picker.Item label="Book" value="Book" />
                <Picker.Item label="Clothes" value="Clothes" />
              </Picker>
            </View>
          </View>
        </View>
        <InputPostComponent
          name="ราคาสินค้า"
          value={price}
          style="w-48"
          onChangeText={(price) => setPrice(price)}
        />
        <InputPostComponent
          name="เกี่ยวกับสินค้า"
          value={detail}
          style="w-full h-12"
          onChangeText={(detail) => setDetail(detail)}
        />
        <View className="flex-row justify-between">
          <InputPostComponent
            name="เลขบัญชี"
            value={accountNumber}
            style="w-[170px]"
            onChangeText={(accountNumber) => setaccountNumber(accountNumber)}
          />
          <InputPostComponent
            name="ชื่อธนาคาร"
            value={accountName}
            style="w-[170px]"
            onChangeText={(accountName) => setAccountName(accountName)}
          />
        </View>
        <InputPostComponent
          name="ชื่อบัญชี"
          value={bankName}
          style="w-[170px]"
          onChangeText={(bankName) => setBankName(bankName)}
        />
        <View>
          <Text className="text-lg font-bold mt-2">Choose Image</Text>
        </View>
        <View className="flex-row justify-between">
          <View>
            <TouchableOpacity
              className="border w-32 h-32 rounded-2xl overflow-hidden"
              onPress={() => pickImage()}
            >
              <Image source={{ uri : image ? image : null }} resizeMode='contain'  style={{ height: 125}}  />
            </TouchableOpacity>
          </View>
        <View className="flex justify-end">
          <ButtonComponent name="Submit" onPress={() => AddPost()} />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;
