const initialState = {
  city: "Please Select", 
  jobs: []
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "SWITCH_LOCATION": 
      return {
        jobs: action.jobs,
        city: action.city
      }

    default:
      return state; // remove this and fill out the body of the reducer function
  }
};

// window.selectLocation = selectLocation
export default reducer;
