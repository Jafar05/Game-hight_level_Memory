import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import styles from './Board.module.css';
import useGameImages from "../../hooks/useGameImages";
import Loader from "../Loader";
import useGameLogic from "../../hooks/useGameLogic";
import Card from "../Card";
import Result from "../Result";

const Board = ({gameOptions, restartGame}) => {
    const [isLoading, setIsLoading] = useState(true)
    const images = useGameImages(gameOptions)
    const {cards, onCardClick, isWin} = useGameLogic(images, gameOptions.pace)

    useEffect(() => {
        if(images.length > 0) {
            setIsLoading(false)
        }
    },[images])
    return (
        <div>
            {isWin && <Result  restartGame={restartGame}/>}
            {isLoading ? (
                <Loader />
            ) : (
                <div className={`${styles.board}`}>
                    {cards.map(card => <Card key={card.uniqueId} card={card} onCardClick={onCardClick}/>)}
                </div>
            )}
        </div>
    );
};

export default Board;
Board.propTypes = {
    gameOptions: PropTypes.shape({
        pace: PropTypes.string.isRequired,
        cardCount: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
    }),
    restartGame: PropTypes.func.isRequired,
}
