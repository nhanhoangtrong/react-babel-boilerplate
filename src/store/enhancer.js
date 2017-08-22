import { compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default compose.bind(null, applyMiddleware(thunk));
