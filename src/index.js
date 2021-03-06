import 'normalize.css/normalize.css';
import 'sanitize.css/sanitize.css';
import injectFastclick from 'react-fastclick';

injectFastclick();

if (process.env.NODE_ENV === 'development') {
    require('./index.dev');
} else {
    require('./index.prod');
}
