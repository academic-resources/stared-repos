import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 18,
    letterSpacing: 1,
  },
  input: {
    padding: 5,
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
    margin: 10,
  },
  btn: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  btnBlack: {
    padding: 15,
    width: 200,
    borderRadius: 5,
    backgroundColor: 'black',
    margin: 10,
  },
  btnWhite: {
    padding: 15,
    width: 200,
    borderRadius: 5,
    backgroundColor: 'white',
    margin: 10,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 2
  },
  btnIncorrect: {
    padding: 15,
    width: 200,
    borderRadius: 5,
    backgroundColor: 'orangered',
    margin: 10,

  },
  btnCorrect: {
    padding: 15,
    width: 200,
    borderRadius: 5,
    backgroundColor: 'limegreen',
    margin: 10,
  },
  startOver: {
    // padding: 15,
    flex: 1,
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'lightsalmon',
    marginTop: 20,
  },
  question: {
    fontSize: 32,
    textAlign: 'center',
  },
  cardsLeft: {
    flex: 1,
    padding: 0,
    margin: 0,
    // flexDirection: 'row',
    // alignSelf: 'flex-start',
    // alignItems: 'flex-start',
  },
  answer: {
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 0.2,
    color: 'firebrick',
    textAlign: 'center',
    margin: 20,
  },
  answerText: {
    fontSize: 18,
    letterSpacing: 0.2,
    textAlign: 'center',
    padding: 10,
  },
  answered: {
    padding: 15,
    margin: 10,
  },
  scoreBoard: {
    borderWidth: 2,
    borderColor: 'orangered',
    borderRadius: 5,
    margin: 20,
    padding: 30,
    fontSize: 26,
    color: 'orangered',
    fontWeight: 'bold',
  },
  quizControls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',

  },
  arrows: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 60,
    letterSpacing: 1,
    fontFamily: 'Varela Round',
    marginBottom: 20,
    color: 'mediumseagreen'

  }


})
