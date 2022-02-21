import React from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';

class Row extends React.Component {
    static propTypes = {
        row: PropTypes.array.isRequired,
    };

    render() {
        const {row} = this.props;

        return <div className="row">
            {row.map((value, index) => <Cell key={`cell-${index}`} value={value} />)}
        </div>;
    }
}

export default Row;