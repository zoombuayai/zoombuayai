import { View, Text , TextInput} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const SearchConponent = () => {
  const navigation = useNavigation();
  return (
    <View className="bg-[#6F6AF8] h-16 flex justify-center">
     <View className="flex-row items-center">
     <TextInput 
      className="bg-white w-56 h-9 rounded-full pl-3 pr-2 ml-2 mr-3"
      />
       <View className="bg-white p-1 rounded-full w-9 h-9 flex justify-center items-center">
       <Ionicons name="search" size={25} color='black' />
       </View>   
       <View className="bg-white p-1 w-10 h-10 rounded-full flex justify-center items-center ml-auto mr-3">
       <Ionicons name="cart" size={25} color='black' onPress={() => navigation.navigate("Cart")}/>
       </View>
     </View>
    </View>
  )
}

export default SearchConponent