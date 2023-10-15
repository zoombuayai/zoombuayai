import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SearchConponent from "../components/SearchConponent";
import PostComponent from "../components/PostComponent";
import { FIREBASE_STORAGE, FIREBASE_DB, FIREBASE_AUTH } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
const HomeScreen = () => {
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const Data = [
    {
      id: "1",
      name: "Clothes",
      img: require("../../assets/pic_category/clothes.png"),
    },
    {
      id: "2",
      name: "Sports",
      img: require("../../assets/pic_category/basketball.png"),
    },
    {
      id: "3",
      name: "Book",
      img: require("../../assets/pic_category/book.png"),
    },
    {
      id: "4",
      name: "Shoes",
      img: require("../../assets/pic_category/shoes.png"),
    },
    {
      id: "5",
      name: "Electronic",
      img: require("../../assets/pic_category/cpu.png"),
    },
    {
      id: "6",
      name: "Entertain",
      img: require("../../assets/pic_category/guitar.png"),
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
        const colRef = collection(FIREBASE_DB, 'Posts');
        const postsRef = query(colRef, orderBy('createdDate', 'desc'));
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
  
        const colRef = collection(FIREBASE_DB, 'Posts');
        const postsRef = query(colRef, orderBy('createdDate', 'desc'));
        const unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
        const productsData = [];
  
        querySnapshot.forEach((doc) => {
          
          const product = {
            id: doc.id,
            ...doc.data(),
          };
          productsData.push(product);
        });

        const filteredProducts = selectedCategory
        ? productsData.filter((product) => product.category === selectedCategory)
        : productsData;

        setProducts(filteredProducts);
      });
      }
    });
  },[selectedCategory]);
  
  console.log(products);

  function renderItems(item) {
    return (
      <TouchableOpacity 
        key={item.id}
        className="border w-20 h-20 m-1 rounded-md relative p-1 bg-[#4B0082]"
        onPress={() => {
          if (selectedCategory === item.name) {
            setSelectedCategory(null); 
          } else {
            setSelectedCategory(item.name);
          }
        }}
        
      >
        <Image className="w-full h-full" source={item.img} />
        <View className="flex items-center">
          <Text className="absolute text-white bottom-0 text-[15px] font-semibold text-center">
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <PostComponent
      productName={item.productName}
      category={item.category}
      detail={item.detail}
      price={item.price}
      userid={item.userid}
      id={item.id}
      bankName={item.bankName}
      createdDate={item.createdDate}
    />
  )}
  ListHeaderComponent={
    <>
      <SearchConponent />
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={Data}
      renderItem={({ item }) => renderItems(item)}
      keyExtractor={(item) => item.id}
    />
      <View className="p-2 mb-[-40px]">
        <Text className="text-2xl font-bold">Lastest Post</Text>
      </View>
    </>
  }
/>

  );
};

export default HomeScreen;
