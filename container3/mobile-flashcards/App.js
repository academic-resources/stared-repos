import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import NewDeckView from './components/NewDeckView'
import DeckListView from './components/DeckListView'
import IndividualDeckView from './components/IndividualDeckView'
import QuizView from './components/QuizView'
import Answer from './components/Answer'
import NewQuestionView from './components/NewQuestionView'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { mediumSeaGreen, white } from './utils/colors'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/_initialData'


function FlashCardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}


const Tabs = TabNavigator({
  Decks: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add' size={30} color={tintColor} />
    },
  },

}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? mediumSeaGreen : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : mediumSeaGreen,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({

  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: IndividualDeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mediumSeaGreen,
      }
    }
  },
  Quiz: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mediumSeaGreen,
      }
    }
  },
  Answer: {
    screen: Answer,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mediumSeaGreen,
      }
    }
  },
  AddCard: {
    screen: NewQuestionView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: mediumSeaGreen,
      }
    }
  }

})




export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (

      <View style={{flex: 1}}>
        <FlashCardStatusBar backgroundColor={mediumSeaGreen} barStyle='light-content'/>
        <MainNavigator/>
      </View>
    )
  }
}
