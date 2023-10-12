import { View, Text, SafeAreaView, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import SearchConponent from '../components/SearchConponent'
import StackTapComponent from '../components/StackTapComponent'
import { FIREBASE_AUTH } from '../../config';
import { signOut } from 'firebase/auth';

const SettingScreen = () => {
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const logout = async ()=> {
    await signOut(auth);
    navigation.navigate("Welcome")
    console.log('logout')
  }

  return (
    <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
      <SearchConponent/>
      <View className="p-3">
        <Text className="text-lg text-gray-500 font-semibold">Account</Text>
      <StackTapComponent
      name="Account Setting"
      detail="Password Change,Privacy"
      onPress={() => navigation.navigate("AccountScreen")}

      />
      <StackTapComponent
      name="Legal & Policies"
      detail="Term of service,Data policy"
      style="mt-6"
      />
        <Text className="text-lg text-gray-500 font-semibold mt-3">Preference</Text>
        <StackTapComponent
      name="Privacy"
      detail="Blocked  people."
      style="mt-3"
      />
          <StackTapComponent
      name="Notification"
      detail="Control notifications."
      style="mt-3"
      />
          <StackTapComponent
      name="Log out"
      detail="Let Log out"
      style="mt-3"
      onPress={() => logout()}

      />
      </View>
    </SafeAreaView>
  )
}

export default SettingScreen