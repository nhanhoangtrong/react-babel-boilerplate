import injectTapEventPlugin from 'react-tap-event-plugin';
// ==== Needed for onTouchTap
//			Note: This should only be instantiated once!
//			Reference: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

if (process.env.NODE_ENV === 'development') {
    require('./index.dev');
} else {
    require('./index.prod');
}
