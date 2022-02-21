import React from 'react';
import PropTypes from 'prop-types';
import Grid from './grid';
import {updateMaxRandom, updateMinRandom} from '../store/actions';
import {connect} from 'react-redux';

class Generator extends React.Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
    };

    render() {
        const {size} = this.props;

        return <div className="d-flex justify-content-center bg-dark">
            <Grid width={(2**size) + 1} height={(2**size) + 1} />
        </div>;
    }
}

const mapStateToProps = state => {
    const {size} = state.city;

    return {size};
};

const mapDispatchToProps = dispatch => ({
    updateMinRandom: minimum => dispatch(updateMinRandom(minimum)),
    updateMaxRandom: maximum => dispatch(updateMaxRandom(maximum)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Generator);