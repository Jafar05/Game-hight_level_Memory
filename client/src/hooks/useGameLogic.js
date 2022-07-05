import {useEffect, useState} from "react";
import {addUniqueIds, getFormedData, getPairedPics, shuffleCards} from "../utils";

const MAX_VISIABLE_CARDS = 2
const PACES = {
    easy: 1500,
    medium: 1000,
    hard: 500,
    pro: 200,
}
const useGameLogic = (images, gamePace) => {
    const [score, setScore] = useState(0);
    const [isWin, setIsWin] = useState(false);
    const [cards, setCards] = useState([]);
    const [visiableCards, setVisiableCards] = useState([]);

    const prepareCards = () => {
        const a = getFormedData(images);
        const b = getPairedPics(a);
        const c = addUniqueIds(b);
        const d = shuffleCards(c);
        setCards(d)
    }

    const flipCard = (clickedCardId) => {
        const flippedCards = cards.map(card => {
            if(card.uniqueId === clickedCardId) {
                card.isShown = true
            }
            if(card.isShown) {
                setVisiableCards(oldState => [...oldState, card.uniqueId])
            }

            return card
        })
        setCards(flippedCards)
    }

    const onCardClick = clickedCardId => {
        if(visiableCards.length < MAX_VISIABLE_CARDS) {
            flipCard(clickedCardId)
        }
    }
    const updateScore = () => {
        setScore(oldScore => oldScore + 1)
    }
    const checkMatch = () => {
        const visiable = cards.filter(card => visiableCards.indexOf(card.uniqueId) !== -1)
        const matched = visiable[0].id === visiable[1].id

        const updatedCards = cards.map(card => {
            if(visiableCards.indexOf(card.uniqueId) !== -1) {
                card.isShown = false;
                card.isFound = matched;
            }
        })

        setTimeout(() => {
            setVisiableCards([])
            if(matched) {
                updateScore();
            }
        },PACES[gamePace]);
    }

    useEffect(() => {
        if(images.length > 0) {
            prepareCards()
        }
    }, [images]);

    useEffect(() => {
        if(visiableCards.length >= MAX_VISIABLE_CARDS) {
            checkMatch()
        }
    });
    useEffect(() => {
        if(images.length && score === images.length) {
            setIsWin(true);
        }
    },[score])


    return {cards, onCardClick, isWin}
};

export default useGameLogic;