import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Keyboard, SafeAreaView, StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';

// DB
import {app, db, getFirestore, collection, addDoc, getDocs, doc, deleteDoc} from './firebase/index'

// Icons
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Components
import ShoppingItem from './src/components/ShoppingItem';

export default function App() {

  const [title, setTitle] = useState("")
  const [shoppingList, setShoppingList] = useState([])

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
    getShoppingList()
  }

  // const getShoppingList = async () => {
  //   const querySnapshot = await getDocs(collection(db, "shopping"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, doc.data());
  //     setShoppingList({
  //       ...doc.data(),
  //       id: doc.id
  //     })
  //   });
  // }

  const getShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    
    setShoppingList(
      querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    )

    console.log(shoppingList)
  }

  const deleteShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)))
    getShoppingList()
  }

  useEffect(() => {
    getShoppingList()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* header */}
        <Text style={styles.heading}>Shopping List</Text>

        {/* number of shopping items */}
        <Text style={styles.numOfItems}>{shoppingList.length}</Text>

        {/* delete all */}
        <Pressable onPress={deleteShoppingList}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </Pressable>

      </View>
      
      {/* flatlist */}
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          renderItem={({item}) => (<ShoppingItem title={item.title} isChecked={item.isChecked} id={item.id} getShoppingList={getShoppingList} />)}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <ActivityIndicator />
        // <Text>Não tem nada</Text>
      )}
      

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            {/* text input */}
            <TextInput
              placeholder='Enter shopping item'
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
              onSubmitEditing={addShoppingItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 32
  },
  header: {
    flexDirection: 'row',
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
  },
  inputContainer: {
    paddingTop: 20,
    paddingBottom: 20
  }
});
