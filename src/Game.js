import React, {Component} from 'react';
import './Game.css';
import arrow_down from './thin-arrowheads-pointing-down.svg';
import arrow_up from './chevron-up.svg';


function Square(props) {

  let classes = props.isWinner ? ["square", "winner"] : ["square"]; 

    return (
      <button 
        className={classes.join(" ")} 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    let win = calculateWinner(this.props.squares);

    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWinner={win ? win.winSquares.includes(i) : null}
      />
    );
  }

  render() {

    const arr = Array(3).fill(0);
    let i = 0;
    const board = arr.map ((value, rowNumber) => {
      const tempo = [i, i + 1, i + 2];
      const row = tempo.map ((squareNumber) => {
      return <div key={squareNumber}>{this.renderSquare(squareNumber)}</div>
      });
      i += 3;
      return (
        <div key={i} className="display-flex">
          {row}
        </div>
      )
    })

    return (
      <div>
        {board}
      </div>
    );
}
}

class Game extends Component {

constructor(props) {
  super(props);
  let classes = Array(9).fill(false);
  classes[0] = true;
  this.state = {
    history: [{
      squares: Array(9).fill(null),
      position: '',
    }],
    addClass: classes,
    xIsNext: true,
    stepNumber: 0,
    direction: true,
  }
}

handleClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  let current = history[history.length - 1];
  const squares = current.squares.slice();
  let position = '';
  const currentElement = this.state.xIsNext ? 'X' : 'O';
  let classes = Array(9).fill(false);
  classes[history.length] = true;

  if ( i % 3  === 0 ) {
    if ( i < 3) {
      position = '(1,1)';
    } else if ( i < 6 && i >= 3) {
      position = '(1,2)';
    } else {
      position = '(1,3)';
    }
  } else if ( i % 3 === 1 ) {
    if ( i < 3) {
      position = '(2,1)';
    } else if ( i < 6 && i >= 3) {
      position = '(2,2)';
    } else {
      position = '(2,3)';
    }
  } else {
    if ( i < 3) {
      position = '(3,1)';
    } else if ( i < 6 && i >= 3) {
      position = '(3,2)';
    } else {
      position = '(3,3)';
    }
  };

  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  else {
    squares[i] = currentElement;
    position = currentElement + ' to ' + position;
    this.setState({
      history: history.concat([{
        squares: squares,
        position: position,
      }]),
      addClass: classes,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

}

jumpTo(step) {
  let classes = Array(9).fill(false);
  classes[step] = true;
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
    addClass: classes,
  });
}

toggle() {
  this.setState({
    direction: !this.state.direction,
  });
}

  render() {

    const history = this.state.history;
    let current = history[this.state.stepNumber];
    let status = calculateWinner(current.squares) ? 
    `Winner: ${calculateWinner(current.squares).winner}`:
    `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ': ' + step.position:
        'Go to game start';
      const classes = this.state.addClass[move] ? ["bold"] : "";

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={classes[0]}
            >{desc}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="game-description">Position of the next move is defined in format (column, row). Countdown goes from 1.</div>
          <div>{status}</div>
          <button className="direction-button" onClick={() => this.toggle()}>
            <img src={this.state.direction ? arrow_up : arrow_down} alt="arrow"/>
          </button>
          <ol>{this.state.direction ? moves : moves.reverse()}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winSquares: [a,b,c],
      };
    } else if (!squares.includes(null)) {
      return {
        winner: "None",
        winSquares: [],
      }
    }
  }
  return;
}

export default Game;