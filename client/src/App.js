import Background from "./components/Background";
import useGameImages from "./hooks/useGameImages";
import Settings from "./components/Settings";
import {useState} from "react";
import Board from "./components/Board";


function App() {
    const [gameOptions, setGameOptions] = useState(null)


    const startGame = (options) => {
        setGameOptions(options)
    };
    const restartGame = () => {
        setGameOptions(null)
    }
  return (
      <>
        <Background />
        <h1>Memory Game</h1>
          {!gameOptions? (
              <Settings startGame={startGame}/>
          ) : (
              <Board gameOptions={gameOptions} restartGame={restartGame}/>
          )}

      </>
  );
}

export default App;
