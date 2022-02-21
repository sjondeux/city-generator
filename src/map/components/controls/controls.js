import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {regenerateMap, updateMaxRandom, updateMinRandom} from '../../store/actions';

class Controls extends React.Component {
    static propTypes = {};

    updateMin = event => {
        const {target: {value}} = event;

        this.props.updateMinRandom(value);
    };

    updateMax = event => {
        const {target: {value}} = event;

        this.props.updateMaxRandom(value);
    };

    render() {
        const {minRandom, maxRandom} = this.props;

        return <div className="col bg-secondary">
            <div className="row">
                <div className="col-2 p-4">
                    <div className="input-group">
                        <label htmlFor="minRandom" className="form-label">Random Minimum <b>({minRandom})</b></label>
                        <input type="range" className="form-range" min="-20" max="0" step={1} value={minRandom} id="minRandom" onChange={this.updateMin} />
                        <label htmlFor="maxRandom" className="form-label">Random Maximum <b>({maxRandom})</b></label>
                        <input type="range" className="form-range" min="0" max="20" step={1} value={maxRandom} id="maxRandom" onChange={this.updateMax} />
                    </div>
                </div>
                <div className="col-2 p-4">
                    <div className="input-group">
                        <button className="btn btn-success" onClick={this.props.regenerateMap}>Render</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    const {minRandom, maxRandom} = state.city;

    return {minRandom, maxRandom};
};

const mapDispatchToProps = dispatch => ({
    updateMinRandom: minimum => dispatch(updateMinRandom(minimum)),
    updateMaxRandom: maximum => dispatch(updateMaxRandom(maximum)),
    regenerateMap: () => dispatch(regenerateMap()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);