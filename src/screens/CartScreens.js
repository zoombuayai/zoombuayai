import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'

const CartScreens = () => {
  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      <Text>CartScreens</Text>
    </SafeAreaView>
  )
}

export default CartScreens