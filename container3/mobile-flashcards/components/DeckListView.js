import React, { Component } from 'react'
import { FLASHCARDS_STORAGE_KEY, initialFlashCards } from '../utils/_initialData'
import { timestampData } from '../utils/helpers'
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage, Animated, ScrollView } from 'react-native'
import IndividualDeckView from './IndividualDeckView'
import { Font } from 'expo'
import styles from '../utils/styles'

export class FadeInView extends Component {
  state = {
    fade: new Animated.Value(0)
  }

  componentDidMount() {
    Animated.timing(
      this.state.fade, {
        toValue: 1,
        duration: 5000,
      }
    ).start()
  }

  render() {
    const { fade } = this.state

    return (
      <Animated.View
        style={{...this.props.style,
          opacity: fade
        }}>{this.props.children}
      </Animated.View>
    )
  }
}

export default class DeckListView extends Component {

  constructor() {
    super()
    this.state = {
      date: null,
      firstLaunch: null,
      decks: [],
      reminder: true,
      fontLoaded: false,
    }
  }

  componentDidMount() {

    this.loadAssetsAync()

    const value = AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)

    if (value !== null) {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialFlashCards), () => {
        AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY, (err, results) => {
          this.setState({ decks: JSON.parse(results) })
        })
      }).then((response) => {
        // There's no response, but if we're here the storage has been succesfully set!
        // Set the initial state
        this.setState({ firstLaunch: true, date: timestampData() })
      }).catch((error) => {
        // Otherwise output error to the console
        console.log("Oops, something went wrong..", error)
      })
    }

  }

  async loadAssetsAync() {
    await Font.loadAsync({
      'Varela Round': require('../assets/fonts/VarelaRound-Regular.ttf'),
    })
    this.setState({
      fontLoaded: true
    })
  }

  refreshDeckListView = () => {
    this.setState((prevState, props) => ({
      reminder: !prevState.reminder
    }))
  }



  render() {

    const { decks, reminder, date } = this.state

    if (this.state.firstLaunch && decks !== undefined) {
      return (

        <ScrollView style={{paddingVertical: 20, paddingBottom: 30, flex: 1}}>
          <View style={{flex: 1}}>
            {this.state.fontLoaded &&
              <FadeInView style={{}}>
                <Text style={styles.mainTitle}>flashcards</Text>
              </FadeInView>
            }

            {
              Object.keys(decks).map((key, i) => {
                return (<TouchableOpacity style={styles.deck} key={i} onPress={() => this.props.navigation.navigate('Deck', {
                  deckId: i,
                  title: decks[key].title,
                  questions: decks[key].questions,
                  refresh: this.refreshDeckListView
                })}>
                  <Text style={styles.deckTitle}>{decks[key].title}</Text>
                  {
                    decks[key].questions.length > 0
                      ? (<Text>{decks[key].questions.length} cards</Text>)
                      : (<Text>0 cards</Text>)
                  }
                </TouchableOpacity>)
              })
            }

            {

              reminder && date === timestampData()
                ? <Text style={{textAlign: 'center'}}>👋 Don't forget to study today!</Text>
                : <Text style={{textAlign: 'center'}}>👍 You've already studied for today!</Text>
            }
          </View>
        </ScrollView>

      )

    } else {
      return (<View>
        <Text>{JSON.stringify(this.state.firstLaunch)}</Text>
        <Text>Something went wrong..</Text>
      </View>)
    }

  }

}
