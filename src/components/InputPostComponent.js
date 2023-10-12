import { View, Text , TextInput} from 'react-native'
import React from 'react'

const InputPostComponent = ({name, value, style, onChangeText}) => {
  return (
    <View>
      <Text className="font-bold text-lg mt-2">{name}</Text>
     <View>
        <TextInput
        placeholder={name}
        className={`border border-gray-700 pl-4 py-1 rounded-full mt-1 ${style}`}
        value={value}
        onChangeText={onChangeText}
        />
     </View>
    </View>
  )
}

export default InputPostComponent