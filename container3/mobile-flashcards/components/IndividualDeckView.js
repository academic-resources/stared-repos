import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import styles from '../utils/styles'

export default class IndividualDeckView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title, questions } = navigation.state.params

    return {
      title: title,
      questions: questions,
    }

  }

  render() {

    const { deckId, questions, title, refresh } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 50, textAlign: 'center'}} >{title}</Text>
        <Text style={{fontSize: 30, textAlign: 'center', marginBottom: 50}} >{questions.length} cards</Text>
        <TouchableOpacity style={styles.btnWhite} onPress={() => this.props.navigation.navigate('AddCard',
          {
            deckId: deckId,
            title: title,
            questions: questions,
          }
        )}>
          <Text style={{color: 'black', textAlign: 'center'}}>Add Card</Text>
        </TouchableOpacity>
        {questions.length > 0 && (
          <TouchableOpacity style={styles.btnBlack} onPress={() => this.props.navigation.navigate('Quiz',
            {
              deckId: deckId,
              title: title,
              questions: questions,
              refresh: refresh
            }
          )}>
            <Text style={{color: 'white', textAlign: 'center'}} >Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

}
