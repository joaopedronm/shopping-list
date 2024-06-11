import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import ShoppingItem from './src/components/ShoppingItem';
import { useState, useEffect } from 'react';

import {app, db, getFirestore, collection, addDoc} from './firebase/index'

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [title, setTitle] = useState("")

  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* header */}
        <Text style={styles.heading}>Shopping List</Text>

        {/* number of shopping items */}
        <Text style={styles.numOfItems}>5</Text>

        {/* delete all */}
        <Pressable>
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </Pressable>

      </View>
      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />

      {/* text input */}
      <TextInput
        placeholder='Enter shopping item'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1
  },
  numOfItems: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 14,
  },
  input: {
    backgroundColor: 'lightgray',
    padding: 10,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 'auto',
  }
});
