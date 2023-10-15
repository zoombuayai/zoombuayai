import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIREBASE_DB } from "../../config";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const CartScreens = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (userData) => {
      if (userData) {
        setUser(userData);
        const colRef = collection(FIREBASE_DB, "users", userData.uid, "Cart");
        const postsRef = query(colRef, orderBy("createdDate", "desc"));
        const unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
          const productsData = [];

          querySnapshot.forEach((doc) => {
            const product = {
              id: doc.id,
              ...doc.data(),
            };
            productsData.push(product);
          });

          setProducts(productsData);
        });

        return () => {
          unsubscribePosts();
        };
      }
    });
  }, []);

  const addOrder = (idOrder, id) => {
    console.log(id);
    navigation.navigate("Make an Order", {
      orderDetails: {
       idOrder : idOrder,
       Aaid : id,
      },
    });
  }

  const deleteCart = async (productId) => {
    await deleteDoc(doc(FIREBASE_DB,  "users", user.uid, "Cart", productId));
    alert("success");
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="flex items-center">
        {products.map((product) => (
          <View
            key={product.id}
            className="flex-row w-10/12 h-32 rounded-md mb-5 bg-white"
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
            <View className="ml-2 flex items-center justify-center">
              <Image
                className="w-24 h-24 rounded-md"
                source={{
                  uri: product.pic,
                }}
              />
            </View>
            <View className="w-8/12 p-2 justify-between relative">
              <View className="absolute right-0 px-2 my-2">
                <TouchableOpacity onPress={() => deleteCart(product.id)} className='w-6 h-6 flex items-center rounded-full bg-red-600'>
                  <Text className="text-white mt-[-3px] font-bold">_</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text>{product.productName}</Text>
                <Text className="mt-2">{product.bankName}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text>{product.price} Bath</Text>
                <TouchableOpacity onPress={() => addOrder(product.id, product.Aaid)} className="p-1 rounded-md bg-blue-500">
                  <Text className="text-white">Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CartScreens;
