import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";
const StackTapComponent = ({name, detail, style, onPress}) => {
  return (
    <View className={`pl-2 pt-1 ${style}`}>
     <View className="flex-row justify-between items-center pr-2"> 
     <View>
      <Text className="text-[20px] font-semibold" >{name}</Text>
      <Text className="text-[15px] text-gray-400 mt-2">{detail}</Text>
      </View>
      <Ionicons name='arrow-forward-outline' onPress={onPress} size={30} color='gray' />
     </View>
     <View className="border-[1px] border-gray-400 mt-6"></View>
    </View>
  )
}

export default StackTapComponent