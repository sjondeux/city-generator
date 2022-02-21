import React from 'react';
import PropTypes from 'prop-types';
import Layer from './layer';
import {connect} from 'react-redux';
import {regenerateMap} from '../store/actions';

class Grid extends React.Component {
    static propTypes = {
        minRandom: PropTypes.number.isRequired,
        maxRandom: PropTypes.number.isRequired,
        terrain: PropTypes.array.isRequired,
        walls: PropTypes.array.isRequired,
        regenerateMap: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            water: [],
        };
    }

    componentDidMount() {
        this.props.regenerateMap();
    }

    render() {
        const {terrain, walls} = this.props;

        return <div className="layer-container">
            <Layer data={terrain} />
            <Layer data={walls} />
        </div>;
    }
}

const mapStateToProps = state => {
    const {minRandom, maxRandom, terrain, walls} = state.city;

    return {minRandom, maxRandom, terrain, walls};
};

const mapDispatchToProps = dispatch => ({
    regenerateMap: () => dispatch(regenerateMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);