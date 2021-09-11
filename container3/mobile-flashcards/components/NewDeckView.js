import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, initialFlashCards } from '../utils/_initialData'
import styles from '../utils/styles'

export default class NewDeckView extends Component {

  state = {
    title: 'Deck Title',
    questions: []
  }


  submit = () => {

    const { title, questions } = this.state
    let currentData
    // Save to "DB"
    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY, (err, results) => {
      if (results !== null) {
        currentData = JSON.parse(results)
        // currentData[key] = key
        currentData[title] = { title, questions }
        console.log(currentData)
        AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(currentData))
      }

      this.props.navigation.navigate('Deck', {
        title: currentData[title].title,
        questions: currentData[title].questions,
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, textAlign: 'center'}} >What is the title of your new deck?</Text>
        <TextInput
          placeholder={this.state.title}
          editable={true}
          maxLength={140}
          style={styles.input}
          onChangeText={(title) => this.setState({title})}
        />
        <TouchableOpacity style={styles.btn} onPress={this.submit}>
          <Text style={{color: 'white'}}>SUBMIT</Text>
        </TouchableOpacity>

      </View>
    )
  }
}
