import React from 'react';

export default function Square(props) {
      return (
        <button 
          className={props.isWinnerSquare ? 'winner square' : 'square'}
          onClick={props.onClick}>
          {props.value}
        </button>
      );
  }