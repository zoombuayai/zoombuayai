import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SearchConponent from "../components/SearchConponent";
import PostComponent from "../components/PostComponent";
import { FIREBASE_STORAGE, FIREBASE_DB, FIREBASE_AUTH } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
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
  
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "Posts"));
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
      }
    });
  },[selectedCategory]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user);
  
        // ติดตามการเปลี่ยนแปลงในรายการ "Posts"
        const postsRef = collection(FIREBASE_DB, 'Posts');
        const unsubscribePosts = onSnapshot(postsRef, (querySnapshot) => {
          const productsData = [];
  
          querySnapshot.forEach((doc) => {
            const product = {
              id: doc.id,
              ...doc.data(),
            };
            productsData.push(product);
          });
  
          // อัปเดตข้อมูลเมื่อมีการเปลี่ยนแปลง
          setProducts(productsData);
        });
  
        // ยกเลิกการติดตามเมื่อยกเลิก useEffect หรือ component unmount
        return () => {
          unsubscribePosts();
        };
      }
    });
  }, []);
  
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
