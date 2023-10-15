import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_STORAGE, FIREBASE_AUTH } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { TextInput } from "react-native";
import MapView, { Marker } from 'react-native-maps';

const MakeAndOrderScreen = ({ route }) => {
  const {orderDetails} = route.params;
  const [user, setUser] = useState();
  const [product, setProduct] = useState([]);
  const [isCashOnDeliverySelected, setCashOnDeliverySelected] = useState(false);
  const [isBankSelected, setBankSelected] = useState(false);
  const [status, setStatus] = useState("เก็บปลายทาง");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleCashOnDeliveryPress = () => {
    setCashOnDeliverySelected(true);
    setBankSelected(false);
    setStatus("เก็บเงินปลายทาง");
  };

  const handleBankPress = () => {
    setCashOnDeliverySelected(false);
    setBankSelected(true);
    setStatus("ธนาคาร");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        setUser(userData);
        const docRef = doc(
          FIREBASE_DB,
          "users",
          userData.uid,
          "Cart",
          orderDetails.idOrder
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProduct(docSnap.data());
        } else {
            console.log("No such document!");
        }

    }
});
}, []);

const OrderProduct = async () => {
    const docRef = await addDoc(collection(FIREBASE_DB, "users", orderDetails.Aaid , "Order"), {
        OrderBy: user.uid,
        name: name,
        phone: phone,
        address: address,
        Map : selectedCoordinate,
        status : status,
        });
    console.log(docRef);
}

  return (
    <View>
      <View className="flex flex-row items-center justify-between px-6 mt-8">
        <View className="flex-row items-center">
          <Ionicons name="location-sharp" size={30} color="black" />
          <Text className="text-lg">ที่อยู่จัดส่ง</Text>
        </View>
        <Text className="text-lg" onPress={toggleModal}>
          เปลี่ยน
        </Text>
      </View>
      <Modal isVisible={isModalVisible}>
        <View className="bg-white h-3/5 p-3">
          <Text className="text-xl">แก้ไขที่อยู่</Text>
          <View className="flex-row justify-between mt-3"> 
          <TextInput
          className="border border-gray-500 w-6/12 px-1"
          placeholder="ชื่อนามสกุล"
          value={name}
          onChangeText={name => setName(name)}
          />
          <TextInput
          className="border border-gray-500 w-6/12 px-1 ml-1"
          placeholder="หมายเลขโทรศัพท์"
          value={phone}
          onChangeText={phone => setPhone(phone)}
          />
          </View>
          <TextInput
          className="border border-gray-500 w-4/4 px-1 mt-4"
          placeholder="จังหวัด, เขต/อำเภอ, รหัสไปรษณีย์"
          value={address}
          onChangeText={address => setAddress(address)}
          />
       <MapView
        style={{ flex: 1, marginTop: 10, marginBottom: 10, }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={(region) => {
            // จับพิกัดที่ผู้ใช้เลือกและเก็บใน selectedCoordinate
            setSelectedCoordinate({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
      >
         {selectedCoordinate && (
              <Marker
                coordinate={selectedCoordinate}
                title="Selected Location"
              />
            )}
      </MapView>
        
          <Button title="Save" onPress={toggleModal} />
        </View>
      </Modal>
      <View className=" px-6 mt-4">
      <Text>
    {name} {phone} {address}
</Text>


      </View>
      <View
        className="flex-row h-36 w-10/12 m-auto mt-5 rounded-lg bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="flex justify-center px-2 overflow-hidden ">
          <Image
            className="w-28 h-28 rounded-lg"
            source={{
              uri: product.pic,
            }}
          />
        </View>
        <View>
          <View className="flex-row items-center mt-5">
            <Image
              className="w-11 h-11 rounded-full"
              source={{
                uri: product.userid,
              }}
            />
            <Text className="ml-2">{product.bankName}</Text>
          </View>
          <View className="mt-2">
            <Text className="mt-2 font-bold text-[16px]">
              {product.productName}
            </Text>
            <Text>{product.price} Bath</Text>
          </View>
        </View>
      </View>
      <View className="py-5 px-8">
        <Text className="text-lg font-bold">วิธีการชำระเงิน</Text>
        <View className="flex-row justify-between mt-3">
          <TouchableOpacity
            onPress={handleCashOnDeliveryPress}
            className={`border w-[47%] p-1 flex justify-center items-center rounded-lg ${
              isCashOnDeliverySelected ? "border-orange-500" : ""
            }`}
          >
            <Text
              style={{ color: isCashOnDeliverySelected ? "orange" : "black" }}
            >
              เก็บเงินปลายทาง
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBankPress}
            className={`border w-[47%] p-1 flex justify-center items-center rounded-lg ${
              isBankSelected ? "border-orange-500" : ""
            }`}
          >
            <Text style={{ color: isBankSelected ? "orange" : "black" }}>
              ธนาคาร
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex items-center mt-24">
        <TouchableOpacity
        className="w-5/12 p-2 rounded-lg flex items-center bg-blue-500"
        onPress={() => OrderProduct()}
        >
            <Text className="text-lg text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakeAndOrderScreen;
