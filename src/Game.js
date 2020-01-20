import React, {Component} from 'react';
import './Game.css';


function Square(props) {

    return (
      <button 
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
}
}

class Game extends Component {

constructor(props) {
  super(props);
  this.state = {
    history: [{
      squares: Array(9).fill(null),
      position: '',
    }],
    xIsNext: true,
    stepNumber: 0,
  }
}

handleClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  let current = history[history.length - 1];
  const squares = current.squares.slice();
  let position = '';
  const currentElement = this.state.xIsNext ? 'X' : 'O';

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
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

}


jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  });
}

  render() {

    const history = this.state.history;
    let current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    
    if (winner) {
      status = `Winner: ${winner}`;
    }
    else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ': ' + step.position:
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares} 
            onClick={ (i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="game-description">Position of the next move is defined in format (column, row). Countdown goes from 1.</div>
          <div>{status}</div>
          <ol>{moves}</ol>
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
      return squares[a];
    }
  }
  return null;
}

export default Game;
