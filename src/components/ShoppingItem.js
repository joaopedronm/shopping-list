import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// shopping object

const ShoppingItem = () => {
  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable>
        <FontAwesome5 name="check-circle" size={24} color="black" />
      </Pressable>

      {/* shopping text */}
      <Text style={styles.title}>Bread</Text>

      {/* delete button */}
      <Pressable>
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