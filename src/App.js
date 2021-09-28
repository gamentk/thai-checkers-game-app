import React, { useState } from 'react';

// Screens
import { Game, Test } from './screens';

const App = () => {
    const [gameId, setGameId] = useState(1);

    function resetGame() {
        setGameId(prevId => prevId + 1);
    }

    return (
        <Game
            key={gameId}
            resetGame={resetGame}
        />
    );
}

export default App;