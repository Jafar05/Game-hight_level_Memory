import React, {useState} from 'react';
import PropTypes from 'prop-types';

import styles from './Settings.module.css';
import {CATEGORIES, INITIAL_CARDS_COUNT, PACE} from "../../constans";
import RadioBox from "../RadioBox";
import Counter from "../Counter";

const Settings = ({startGame}) => {
    const [category, setCategory] = useState(CATEGORIES[0])
    const [pace, setPace] = useState(PACE[0])
    const [cardCount, setCardCount] = useState(INITIAL_CARDS_COUNT)

    const onStartGameClick = () => {
        startGame({category, pace, cardCount})
    }
    return (
        <>
            <div className={`${styles.settings} frosted`}>
                <h2>Settings</h2>
                <h4>Category:</h4>
                <div className={`${styles.setting}`}>
                    {CATEGORIES.map(item => (
                        <RadioBox
                            key={item}
                            name={item}
                            selectedItem={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                    ))}
                </div>
                <h4>Counter</h4>
                <div className={`${styles.setting}`}>
                    <Counter cardCount={cardCount} onClick={setCardCount}/>
                </div>
                <h4>Pace:</h4>
                <div className={`${styles.setting}`}>
                    {PACE.map(item => (
                        <RadioBox
                            key={item}
                            name={item}
                            selectedItem={pace}
                            onChange={(e) => setPace(e.target.value)}
                        />
                    ))}
                </div>
            </div>

            <button className={`${styles.button} frosted`} onClick={onStartGameClick}>Start</button>

        </>
    );
};

export default Settings;

Settings.propTypes = {
    startGame: PropTypes.func.isRequired,
}