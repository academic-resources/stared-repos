import React, { Component } from 'react'
import { View, TouchableOpacity, Text, ScrollView, Button, AsyncStorage, Alert } from 'react-native'
import styles from '../utils/styles'
import { StackNavigator } from 'react-navigation'
import {
  FLASHCARDS_STORAGE_KEY,
  initialFlashCards,
  clearLocalNotification,
  setLocalNotification
} from '../utils/_initialData'
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { mediumSeaGreen, white } from '../utils/colors'
import { Answer } from './Answer'

export default class QuizView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      questionsLength: 0,
      scoreBoard: 0,
      score: 0,
      answered: false,
    }
  }

  componentDidMount() {
    console.log("Setting state")
    this.setState({
      questionsLength: this.props.navigation.state.params.questions.length
    })
    // Signal that we already studied for today
    this.props.navigation.state.params.refresh()
    clearLocalNotification()
      .then(setLocalNotification)
  }


  static navigationOptions = ({ navigation }) => {
    const { title, questions, reminder } = navigation.state.params


    return {
      title: 'Quiz',
      questions: questions,
      reminder: reminder
    }
  }


  customAlert = (title, message) => {
    return (
      Alert.alert(
        title,
        ``, [
          { text: message, onPress: () => { console.log("Fired customAlert")} },
        ], { cancelable: false }
      )
    )
  }

  next = () => {

    if (this.state.index < this.state.questionsLength - 1) {
      this.setState(function(prevState, props) {
        console.log(prevState, props)
        return {
          index: prevState.index + 1,
          answered: false
        }
      })
    } else {
      this.customAlert(`You're aready at the end!`, `Ok, I see it now..`)
    }

  }

  previous = () => {
    const { index, questionsLength } = this.state
    if (index > 0) {
      this.setState(function(prevState, props) {
        console.log(prevState, props)
        return {
          index: prevState.index - 1,
        }
      })
    } else {
      this.customAlert(`You're aready at the begining!`, `Ok, I see it now..`)
    }
  }

  correct = (index, title) => {
    let currentScore = this.state.score
    this.setState((prevState, props) => ({
      scoreBoard: prevState.scoreBoard + 1,
      answered: !prevState.answered
    }))

  }

  incorrect = () => {

    let currentScore = this.state.score
    if (currentScore >= 0) {
      this.setState((prevState, props) => ({
        scoreBoard: prevState.scoreBoard,
        answered: !prevState.answered
      }))
    } else {
      customAlert(`Scoreboard is zero`, `OK, I see it now..`)
    }
  }

  reset = (index, title) => {

    Alert.alert(
      `You're about to reset your score and progress..`,
      ``, [
        { text: 'Yes, reset please!', onPress: () => {
          this.setState((prevState, props) => ({
            scoreBoard: 0,
            answered: false,
            index: 0
          }))
        } },
      ], { cancelable: false }
    )

  }


  render() {

    const questions = this.props.navigation.state.params.questions
    const questionsLength = this.props.navigation.state.params.questions.length
    const { index, scoreBoard, answered } = this.state
    const { navigation } = this.props
    const title = this.props.navigation.state.params.title

    return (

      <View style={styles.container}>
        <Text style={styles.scoreBoard}>Score: {scoreBoard} out of {this.state.questionsLength}</Text>
        <Text>Card: {index + 1} / {this.state.questionsLength}</Text>
        <Text style={styles.question}>{questions[index].question}</Text>
        <Text style={styles.answer} onPress={() => navigation.navigate('Answer', questions[index].answer)}>Answer</Text>

        { !answered ? (
          <View>
            <TouchableOpacity style={styles.btnCorrect} onPress={() => this.correct(index, title)}>
              <Text style={{color: 'white', textAlign: 'center'}}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIncorrect} onPress={this.incorrect}>
              <Text style={{color: 'white', textAlign: 'center'}}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        ): (
          <View style={styles.answered}>
            <Text>You've already answered this question.</Text>
          </View>
        )}
        <View style={styles.arrows}>
          <FontAwesome style={{marginRight: 120}} name='arrow-left' size={35} color={mediumSeaGreen} onPress={this.previous}/>
          <FontAwesome style={{marginLeft: 120}} name='arrow-right' size={35} color={mediumSeaGreen} onPress={this.next}/>
        </View>
        <View style={styles.quizControls}>
          <TouchableOpacity style={styles.startOver} onPress={() => this.reset(index, title)}>
            <Text style={{color: 'white', textAlign: 'center'}}>Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startOver} onPress={() => navigation.goBack()}>
            <Text style={{color: 'white', textAlign: 'center'}}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>

    )


  } // End of Render

}
