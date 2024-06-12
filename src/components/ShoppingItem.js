import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';

import {db, doc, updateDoc, deleteDoc} from '../../firebase/index'

// shopping object
/*
  1. id
  2. title
  3. isChecked

*/

const ShoppingItem = (props) => {

  const [isChecked, setIsChecked] = useState(props.isChecked)

  const updateIsChecked = async () => {
    const shoppingRef = doc(db, "shopping", props.id);
  
    // Set the "capital" field of the city 'DC'
    await updateDoc(shoppingRef, {
      isChecked: isChecked,
    });
  }

  const deleteShoppingItem = async () => {
    await deleteDoc(doc(db, "shopping", props.id));
    props.getShoppingList()
  }

  useEffect(() => {
    updateIsChecked()
  }, [isChecked])


  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <AntDesign name="checkcircle" size={24} color="black" />
        ) : (
          <FontAwesome5 name="check-circle" size={24} color="black" />
        )}
      </Pressable>

      {/* shopping text */}
      <Text style={styles.title}>{props.title}</Text>

      {/* delete button */}
      <Pressable onPress={deleteShoppingItem}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent :'space-between',
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: 10
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
    }
})