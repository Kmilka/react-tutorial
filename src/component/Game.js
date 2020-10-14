import React, {Component} from 'react';

//css
import './Game.css';
//components
import Board from './Board';
import History from './History';

const initialState = {
  gameHistory: [{
    board: Array(9).fill(null),
    elementPosition: '',
  }],
  xIsNext: true,
  stepNumber: 0,
}

class Game extends Component {

  constructor() {
    super();
    this.state = {
      gameHistory: initialState.gameHistory,
      xIsNext: initialState.xIsNext,
      stepNumber: initialState.stepNumber,
    }
  }

  handleClick = (i) => {
    const { gameHistory, xIsNext, stepNumber } = this.state;
    const currentBoardState = gameHistory[stepNumber].board.slice();
    let currentPosition = '';
    const currentElement = xIsNext ? 'X' : 'O';

    if ( i % 3  === 0 ) {
      if ( i < 3) {
        currentPosition = '(1,1)';
      } else if ( i < 6 && i >= 3) {
        currentPosition = '(1,2)';
      } else {
        currentPosition = '(1,3)';
      }
    } else if ( i % 3 === 1 ) {
      if ( i < 3) {
        currentPosition = '(2,1)';
      } else if ( i < 6 && i >= 3) {
        currentPosition = '(2,2)';
      } else {
        currentPosition = '(2,3)';
      }
    } else {
      if ( i < 3) {
        currentPosition = '(3,1)';
      } else if ( i < 6 && i >= 3) {
        currentPosition = '(3,2)';
      } else {
        currentPosition = '(3,3)';
      }
    };

    if (this.calculateWinner() || currentBoardState[i]) {
      return;
    }
    else {
      currentBoardState[i] = currentElement;
      currentPosition = currentElement + ' to ' + currentPosition;
      this.setState({
        gameHistory: gameHistory.concat([{
          board: currentBoardState,
          position: currentPosition,
        }]),
        xIsNext: !xIsNext,
        stepNumber: gameHistory.length,
      });
    }

  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  calculateWinner = () => {
    const currentBoardState = this.state.gameHistory[this.state.stepNumber].board.slice();
    const possibleWinnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < possibleWinnerLines.length; i++) {
      const [a, b, c] = possibleWinnerLines[i];
      if (currentBoardState[a] && currentBoardState[a] === currentBoardState[b] && currentBoardState[a] === currentBoardState[c]) {
        return  {
          winner: currentBoardState[a],
          winnerLine: [a,b,c],
        };
      } else if (!currentBoardState.includes(null)) {
        return {
          winner: 'None',
          winnerLine: []
        }
      }
    }
    return null;
  }

  resetGame = () => {
    this.setState(initialState);
  }

  render() {

    const { gameHistory, stepNumber, xIsNext } = this.state;
    let calculatedWinner = this.calculateWinner();
    let gameStatusMessage = calculatedWinner ? `Winner: ${calculatedWinner.winner}`: `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
      <div>
        <p style={{marginLeft: '20px'}} >{gameStatusMessage}</p>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <Board
            squares={gameHistory[stepNumber].board} 
            onClick={(i) => this.handleClick(i)}
            winnerLine={calculatedWinner ? calculatedWinner.winnerLine : null}
            />
          <History jumpTo={this.jumpTo} history={gameHistory} />
        </div>
        <button style={{left: '30px', top:'180px', position: 'absolute', width: '90px', height: '20px' }} onClick={this.resetGame}>Reset game</button>
      </div>
    )
  }

}


export default Game;