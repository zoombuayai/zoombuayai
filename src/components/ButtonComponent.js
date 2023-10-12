import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

const ButtonComponent = ({name, onPress, style}) => {
  return (
    <View>
        <TouchableOpacity
        className={`border-white w-[160px] ${style} flex items-center py-[9px] rounded-[10px] bg-[#6F6AF8]`}
        onPress={onPress} >
      <Text className="text-lg text-white font-bold">{name}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ButtonComponent