import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FIREBASE_STORAGE, FIREBASE_DB } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
const PostComponent = ({
  productName,
  category,
  detail,
  price,
  userid,
  id,
  bankName,
  createdDate,
  accountNumber,
  accountName,
  RealId
}) => {
  const [imgUser,setImgUser] = useState("");
  const [imgProduct,setImgProduct] = useState("");
  useEffect(()=> {
    showImgUser();
    showImgProduct();
  },[])

  const showImgUser = () => {
    const storage = FIREBASE_STORAGE;
    getDownloadURL(ref(storage,'Profile/' + userid))
    .then((url) => {
      setImgUser(url);
    })
  }

  const showImgProduct = () => {
    const storage = FIREBASE_STORAGE;
    getDownloadURL(ref(storage,'ImagePost/' + id))
    .then((url) => {
      setImgProduct(url);
    })
  }

  const formatTimestamp = (createdDate) => {
    const now = new Date();
    const time = new Date(createdDate.seconds * 1000);

    // คำนวณระยะเวลาระหว่างเวลาปัจจุบันกับ timestamp
    const timeDiff = now - time;
    const secondsDiff = Math.floor(timeDiff / 1000);

    // แปลงเวลาให้อยู่ในรูปข้อความตามความต้องการ
    if (secondsDiff < 60) {
      return "เร็ว ๆ นี้";
    } else if (secondsDiff < 3600) {
      const minutes = Math.floor(secondsDiff / 60);
      return `${minutes} นาทีที่ผ่านมา`;
    } else if (secondsDiff < 86400) {
      const hours = Math.floor(secondsDiff / 3600);
      return `${hours} ชั่วโมงที่ผ่านมา`;
    } else if (secondsDiff < 172800) {
      return "เมื่อวาน";
    } else if (secondsDiff < 604800) {
      const days = Math.floor(secondsDiff / 86400);
      return `${days} วันที่ผ่านมา`;
    } else {
      const months = now.getMonth() - time.getMonth() + (12 * (now.getFullYear() - time.getFullYear()));
      return `${months} เดือนที่ผ่านมา`;
    }
  };
  const AddToCart = async () => {
    const docRef = await addDoc(collection(FIREBASE_DB, "users" , RealId, "Cart"), {
      Aaid : userid,
      userid : imgUser,
      pic : imgProduct,
      productName : productName,
      category : category,
      price : price,
      detail : detail,
      accountNumber : accountNumber,
      accountName : accountName,
      bankName : bankName,
      createdDate: serverTimestamp(), 
      });
      alert("Success");
  }

  return (
    <View className="h-[490px] mt-10">
      <View className="px-3 pt-2">
        <View className="flex-row justify-between">
          <View className="flex-row">
            <Image
              className="w-16 h-16 rounded-full"
              source={{
                uri : imgUser ? imgUser : null
              }}
            />
            <View className="ml-2 justify-center">
              <Text className="text-[16px] font-semibold">{bankName}</Text>
              <Text className="text-[12px] text-gray-400">{formatTimestamp(createdDate)}</Text>
            </View>
          </View>
          <View>
            <Text onPress={() => alert("Hello")} className="text-5xl">
              ...
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-between mt-3">
          <View className="flex-row items-center">
            <Text className="font-bold text-[16px]">{productName}</Text>
            <Text className="text-[12px] text-gray-400 ml-3">Type {category}</Text>
          </View>
          <Text className="text-xl font-bold">{price} Bath</Text>
        </View>
        <View className="mt-1">
          <Text className="text-[13px]">
            {detail}
          </Text>
        </View>
        <View className="rounded-2xl mt-3 overflow-hidden">
          <Image
            className="w-auto h-[300px]"
            source={{
             uri : imgProduct ? imgProduct : null
           }}
          />
        </View>
        <View className="px-2 flex-row items-center justify-between mt-3">
          <View className="p-1 flex-row  items-center">
            <Ionicons
              name="chatbox-outline"
              size={25}
              color="black"
              onPress={() => alert("POST")}
            />
            <Text className="ml-1">1</Text>
          </View>
          <TouchableOpacity
            className="p-2 w-36 rounded-full justify-center items-center bg-[#6F6AF8]"
            onPress={() => AddToCart()}
          >
            <Text>+ Add to cart</Text>
          </TouchableOpacity>
          <View className="relative flex-col justify-center items-center">
            <Ionicons
              className="absolute"
              name="heart"
              size={33}
              color="red"
              onPress={() => alert("LIKE")}
            />
            <Text className="absolute text-white font-bold">1</Text>
          </View>
        </View>
      </View>
      <View className="h-6 bg-gray-300 mt-4"></View>
    </View>
  );
};

export default PostComponent;
