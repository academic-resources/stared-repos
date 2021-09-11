const initialState = {
  default: [],
  user: [],
  all: [],
};

const SET_CATEGORIES = "categories/setCategories";

const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  categories,
});

export const getCategories = () => async (dispatch) => {
  const response = await fetch("/api/category");
  const parsedResponse = await response.json();
  dispatch(setCategories(parsedResponse));
  return parsedResponse;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      const { defaultCategories, userCategories } = action.categories;
      const categoryList = {
        ...state,
        default: defaultCategories,
        user: userCategories,
        all: [...defaultCategories, ...userCategories],
      };
      return categoryList;
    default:
      return state;
  }
};

export default categoryReducer;
