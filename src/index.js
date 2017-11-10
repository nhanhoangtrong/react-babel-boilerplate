import injectFastclick from 'react-fastclick';
import './index.styl';

injectFastclick();

if (process.env.NODE_ENV === 'development') {
    require('./index.dev');
} else {
    require('./index.prod');
}
