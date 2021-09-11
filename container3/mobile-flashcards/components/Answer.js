import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from '../utils/styles'
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'




const Answer = (props) => {
  const answer = props.navigation.state.params
  return (
    <View style={styles.container}>
      <Ionicons name='md-text' size={100} color={'black'}/>
      <Text style={styles.answerText}>{answer}</Text>
    </View>

  )
}

Answer.navigationOptions = ({ navigation }) => {
  return {
    title: 'Answer',
  }
}

export default Answer
