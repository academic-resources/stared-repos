import React, { Component } from 'react'
import { View, TouchableOpacity, Text, TextInput, AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, initialFlashCards } from '../utils/_initialData'
import styles from '../utils/styles'

export default class NewQuestionView extends Component {

  constructor() {
    super()
    this.state = {
      question: 'Question goes here!',
      answer: 'Answer goes here!',
      deckTitle: '',
      quizzed: false
    }
  }


  static navigationOptions = ({ navigation }) => {
    const { deckId, title, questions } = navigation.state.params

    return {
      title: 'Add Card',
      questions: questions
    }

  }

  componentDidMount() {
    this.setState({
      deckTitle: this.props.navigation.state.params.title
    })
  }


  addCard = (title, card) => {
    let currentData
    const { question, answer } = this.state
    const questions = { question, answer }
    title = this.state.deckTitle

    let object = {
      [title]: {
        'title': [title],
        'questions': questions
      },
    }

    AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY, (err, results) => {
      if (results !== null) {
        currentData = JSON.parse(results)
        currentData[title]['questions'].push(questions)
        AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(currentData))
      }

    })

    // Navigate to home
    this.props.navigation.navigate('Home')

  }

  render() {

    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text>Please enter a question</Text>
        <TextInput style={styles.input} onChangeText={(question) => this.setState({
          question
        })} value={this.state.question}/>
        <Text>Enter an answer</Text>
        <TextInput style={styles.input} onChangeText={(answer) => this.setState({
          answer
        })} value={this.state.answer}/>
        <TouchableOpacity style={styles.btnBlack} onPress={this.addCard}>
          <Text style={{color: 'white', textAlign: 'center'}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    )
  }

}
