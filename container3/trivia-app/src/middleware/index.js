// import logger from './logger' // Uncomment for extra debugging
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

export default applyMiddleware(thunk);
// Comment the line above and uncomment the line below for extra debugging info
// export default applyMiddleware(thunk, logger)
