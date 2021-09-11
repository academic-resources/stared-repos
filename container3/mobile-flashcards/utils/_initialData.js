import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = '@MySuperStore:key'

export const initialFlashCards = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
        quizzed: false
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        quizzed: false
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        quizzed: false
      }
    ]
  }
}

const FLASHCARDS_NOTIFICATIONS_KEY = '@MyNotifications'

export function clearLocalNotification() {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: "Daily Reminder",
    body: "👋 Don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATIONS_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(( {status}) => {

        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          )

          AsyncStorage.setItem(FLASHCARDS_NOTIFICATIONS_KEY, JSON.stringify(true))
        }

      })
    }
  })
}
