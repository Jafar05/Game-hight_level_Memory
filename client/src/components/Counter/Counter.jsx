import React from 'react';
import PropTypes from 'prop-types';

import './Counter.css';

const Counter = ({cardCount, onClick}) => {
    const STEP = 2
    const onDecrement = () => {
        const number = cardCount - STEP
        if(number >= 2) {
            onClick(number)
        }
    }
    const onIncrement = () => {
        const number = cardCount + STEP
        if(number <= 160) {
            onClick(number)
        }
    }
    return (
        <div className="quality">
            <button className="minus" onClick={onDecrement}>-</button>
            <span className="quantity">{cardCount}</span>
            <button className="plus" onClick={onIncrement}>+</button>
        </div>
    );
};

export default Counter;
Counter.propTypes = {
    cardCount: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}
