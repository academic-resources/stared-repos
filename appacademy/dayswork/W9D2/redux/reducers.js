export const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      const newState = state.slice()
      newState.push(action.user)
      return newState;
    default:
      return state;
  }
}

export const roleReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_ROLE':
      return state;
    default:
      return state;
  }
}


// reducer
// {
//     users: () => {},
//     roles: () => {}
// }

// state
// {
//     users: {},
//     roles: {}
// }

// [users, roles]

export const combineReducers = (obj) => {
  const reducerObject = obj;
  return (prevState, action, subscriptions) => {
    const newState = {}
    let changed = false;
      const keys = Object.keys(reducerObject);
    keys.forEach(key => {
        newState[key] = reducerObject[key](prevState[key], action)
        if(newState[key] !== prevState[key]) changed = true;
    })
    // debugger
    if (changed) {
        subscriptions.forEach( s => s(newState))
        return newState
    }
    return prevState
  }
}

// const myNoiseReducer = (prevState = "peace and quiet", action) => {
//     switch (action.type) {
//         case "noisy action":
//             return action.noise;
//         default:
//             return prevState;
//     }
// };

// const myNoisyAction = {
//     type: "noisy action",
//     noise: "Car alarm"
// };

// const myInconsequentialAction = {
//     type: "a type no one cares about",
//     data: {
//         thisThing: "will not get used anyway"
//     }
// };

// const myInitialState = {
//     noise: "peace and quiet"
// };

// const myRootReducer = combineReducers({
//     noise: myNoiseReducer,
// });

// let newState = myRootReducer(myInitialState, myInconsequentialAction);
// console.log({newState});

// // => { noise: "peace and quiet" }

// const ns2 = myRootReducer(newState, myNoisyAction)
// console.log({ ns2});

// // => { noise: "Car alarm" }

// const ns3 = myRootReducer(ns2, myInconsequentialAction)
// console.log({ns3})
// // => { noise: "Car alarm" }
