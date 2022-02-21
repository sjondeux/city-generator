import React from 'react';
import PropTypes from 'prop-types';
import Row from './row';

class Layer extends React.Component {
    static propTypes = {};



    render() {
        const {data} = this.props;

        return <div className="map-layer col">
            {data.map((row, index) => <Row key={`terrain-${index}`} row={row} />)}
        </div>

    }
}

export default Layer;