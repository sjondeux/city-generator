import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.colors = [
            {
                color: 'rgb(11, 31, 64)',
                maxValue: 10
            },
            {
                color: 'rgb(55,107,198)',
                maxValue: 20
            },
            {
                color: 'rgb(141,136,111)',
                maxValue: 30
            },
            {
                color: 'rgb(227,185,76)',
                maxValue: 40
            },
            {
                color: 'rgb(120,148,72)',
                maxValue: 50
            },
            {
                color: 'rgb(172,233,58)',
                maxValue: 60
            },
            {
                color: 'rgb(141,100,61)',
                maxValue: 70
            },
            {
                color: 'rgb(238,171,84)',
                maxValue: 80
            },
            {
                color: 'rgb(212,36,198)',
                maxValue: 90
            },
            {
                color: 'rgb(223,44,255)',
                maxValue: 100
            },
        ]
    }


    getColor = value => {
        let color = 'rgb(255,255,255)';

        if (value === 0) {
            return 'transparent';
        }

        if (value === 1) {
            return 'rgb(88,88,88)'
        }

        for (let i = 0; i < this.colors.length; i++) {
            if (value < this.colors[i].maxValue) {
                return this.colors[i].color;
            }
        }

        return color;
    };

    render() {
        const {value} = this.props;
        const style = {
            backgroundColor: this.getColor(value),
        };

        return <div className="map-tile" style={style} />;
    }
}

export default Cell;