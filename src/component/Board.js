import React, { Component } from 'react';
import Square from './Square';
import './Game.css'

class Board extends Component {

    renderSquare(i) {
      return (
        <Square
          isWinnerSquare= {this.props.winnerLine ? this.props.winnerLine.includes(i) ? true : false : false}
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const arr = Array(3).fill(0);
      let i = 0;
      const board = arr.map((value, rowNumber) => {
        const tempo = [i, i + 1, i + 2];
        const row = tempo.map((squareNumber) => {
        return <div key={squareNumber}>{this.renderSquare(squareNumber)}</div>
        });
        i += 3;
        return (
          <div key={i} style={{display: 'flex'}}>
            {row}
          </div>
        )
      })
  
      return (
        <div style={{margin: '5px 20px'}}>
          {board}
        </div>
      );
  }
}
  
export default Board;