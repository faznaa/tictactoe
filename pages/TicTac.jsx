import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const rowStyle = {
  display: "flex",
};

const squareStyle = {
  "width": "60px",
  "height": "60px",
  "backgroundColor": "#ddd",
  "margin": "4px",
  "display": "flex",
  "justifyContent": "center",
  "alignItems": "center",
  "fontSize": "20px",
  "color": "white",
};

const boardStyle = {
  "backgroundColor": "#eee",
  "width": "208px",
  "alignItems": "center",
  "justifyContent": "center",
  "display": "flex",
  "flexDirection": "column",
  "border": "3px #eee solid",
};

const containerStyle = {
  "display": "flex",
  "alignItems": "center",
  "flexDirection": "column",
};

const instructionsStyle = {
  "marginTop": "5px",
  "marginBottom": "5px",
  "fontWeight": "bold",
  "fontSize": "16px",
};

const buttonStyle = {
  "marginTop": "15px",
  "marginBottom": "16px",
  "width": "80px",
  "height": "40px",
  "backgroundColor": "#8acaca",
  "color": "white",
  "fontSize": "16px",
};

function Square({ index, value, handleClick }) {

  return (
    <div
      className="square"
      onClick={() => handleClick(index)}
      style={squareStyle}>
      {value === 0 ? "" : value}
    </div>
  );
}

function Board() {
  const [nextPlayer, setNextPlayer] = useState("X");
  const _boardVal = [0, 0, 0, 0, 0, 0, 0, 0, 0];
//   const _boardVal = [0, 0, 0, 0, 0, 0, "X", "X", 0];
  const [boardValues, setBoardValues] = useState(_boardVal);
  const [winner, setWinner] = useState("");
  const reset = () => {
    setBoardValues(_boardVal);
    setWinner("")
  }
  const handleClick = (index) => {
    if(winner=="X" || winner=="O" || boardValues[index]!==0) {
        return;
    }
    let _arr = boardValues;
    _arr[index] = nextPlayer;
    console.log(_arr);
    setBoardValues(values => values.map((val, ind) => index === ind ? nextPlayer : val));
    if (nextPlayer === "X") {
      setNextPlayer("O");
    } else {
      setNextPlayer("X");

    }
  };


  const winIndexes = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  useEffect(() => {
    console.log("useeffect running");
    for (let i = 0; i < winIndexes.length; i++) {

      let [a, b, c] = winIndexes[i];
      console.log("abc", a, b, c);

      if ((boardValues[a] === boardValues[b]) && (boardValues[b] === boardValues[c]) && boardValues[a]!==0 ) {
       
        console.log(boardValues[a]);
        setWinner(boardValues[a]);
        return;

        
      }
    }
    if(boardValues.every(i => i!==0)) {
      setWinner("No one wins");
    }


  }, [nextPlayer]);
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{nextPlayer}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={() => reset()}>Reset</button>

      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          {boardValues.slice(0, 3).map((i, index) => <Square key={index} index={index} value={i}
                                                             handleClick={handleClick} />,
          )}
        </div>
        <div className="board-row" style={rowStyle}>
          <div className="board-row" style={rowStyle}>
            {boardValues.slice(3, 6).map((i, index) => <Square key={index + 3} index={index + 3} value={i}
                                                               handleClick={handleClick} />,
            )}
          </div>
        </div>
        <div className="board-row" style={rowStyle}>
          <div className="board-row" style={rowStyle}>
            {boardValues.slice(6, 9).map((i, index) => <Square key={index + 6} index={index + 6} value={i}
                                                               handleClick={handleClick} />,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;
