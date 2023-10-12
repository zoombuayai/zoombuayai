import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const InputComponent = ({style, placeholder, icon, name, value, onChangeText, secureTextEntry}) => {
  return (
    <View className={`w-[270] mt-2 ${style}`}>
      <Text className="text-lg">{name}</Text>
      <View className="border flex-row p-2 mt-1 rounded-md">
      <Ionicons name={icon} size={25} color='black' />
      <TextInput
       placeholder={placeholder}
       className="ml-3"
       value={value}
       onChangeText={onChangeText}
       secureTextEntry={secureTextEntry ? true : false} 
      />
      </View>
    </View>
  )
}

export default InputComponent