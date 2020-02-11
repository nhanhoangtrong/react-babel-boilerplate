import { connect } from 'react-redux';
import { showMain, hideMain } from './actions';

const mapStateToProps = (state) => ({
    isShownText: state.globals.get('isShownMain'),
});

const mapDispatchToProps = (dispatch) => ({
    toggleText: (isShownText) => {
        if (isShownText) {
            dispatch(hideMain());
        } else {
            dispatch(showMain());
        }
    },
});
export const withTextState = connect(
    mapStateToProps,
    mapDispatchToProps
);
