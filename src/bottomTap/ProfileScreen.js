import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet,Image, SafeAreaView, StatusBar} from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB, FIREBASE_STORAGE } from '../../config';
import { getMetadata, ref, getDownloadURL } from 'firebase/storage';
export default function ProfileScreen({navigation}) {

  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const auth = FIREBASE_AUTH;
  const storage = FIREBASE_STORAGE;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

        setUserId(user.uid);
        const userDocRef = doc(FIREBASE_DB, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUserData(userData);
        }
      }
    }, );

    return () => unsubscribe();
  }, );

  useEffect(() => {
    getImageFromStorage();
  });

  const getImageFromStorage = async () => {
    try {
      const fileRef = ref(storage, 'Profile/' + userId);
      const metadata = await getMetadata(fileRef);

    const imageUrl = await getDownloadURL(fileRef);
      setShowImage(imageUrl);
    } catch (error) {
      // console.error('Error getting image from storage: ', error);
    }
  };
  return (
    <SafeAreaView style={styles.container} className="relative" >
      <View className="flex items-center">
      <Image
          className="bg-black rounded-full top-[230px] w-32 h-32 absolute" style={{ zIndex: 1,}}
          source={{
            uri:  showImage ? showImage : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }}
        />
      </View>
      <View style={styles.card1}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.cardTextContainer}>
          <View className="flex items-center">
          <Text style={styles.cardText}>Total Post</Text>
          <Text className="text-lg">5</Text>
          </View>
          <View className="flex items-center">
          <Text style={styles.cardText}>Total Like</Text>
          <Text className="text-lg">10</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  card1: {
    backgroundColor: '#6F6AF8',
    borderRadius: 20,
    width: 'full',
    height: 850,
    bottom: 400,
  },

  profileText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 530,
  },
  cardTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 200,
    paddingHorizontal: 40,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});