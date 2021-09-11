import Store from './store';
import {combineReducers} from './reducers';


// const rootReducer = combineReducers({users: userReducer, roles: roleReducer});


// const store = new Store(rootReducer);

// const testAction = { type: 'ADD_USER', user: 'Bill'}

// console.log(store.getState())
// store.dispatch(testAction);
// console.log(store.getState())

const actionCreator1 = value => ({
    type: "add",
    value
});

const actionCreator2 = value => ({
    type: "subtract",
    value
});

const actionCreator3 = value => ({
    type: "no change",
    value
});

const numberReducer = (num = 0, action) => {
    switch (action.type) {
        case "add":
            return num + action.value;
        case "subtract":
            return num - action.value;
        default:
            return num;
    }
}

const rootReducer = combineReducers({
    number: numberReducer
});

const store = new Store(rootReducer);

store.getState() // => { number: 0 }
console.log({ store: store.getState()});

const announceStateChange = nextState => {
    console.log(`That action changed the state! Number is now ${nextState.number}`);
}

store.subscribe(announceStateChange);

store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 5"
console.log({ store: store.getState() });
store.dispatch(actionCreator1(5)); // => "That action changed the state! Number is now 10"
console.log({ store: store.getState() });
store.dispatch(actionCreator2(7)); // => "That action changed the state! Number is now 3"
console.log({ store: store.getState() });
store.dispatch(actionCreator3(7)); // => Nothing should happen! The reducer doesn't do anything for type "no change"
console.log({ store: store.getState() });
store.dispatch(actionCreator1(0)) // => Nothing should happen here either. Even though the reducer checks for the "add" action type, adding 0 to the number won't result in a state change.
console.log({ store: store.getState() }); // => { number: 3 }

// store.getState(); // => { number: 3 }

