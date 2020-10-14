import React, {Component} from 'react';

class History extends Component {

    fetchGameHistory() {
        return this.props.history.map((move, moveNumber) => {
            const desc = moveNumber ?
                'Go to move #' + moveNumber + ': ' + move.position:
                'Go to game start';
            return <button style={{margin: '2px', textAlign: 'center', width: '180px'}} onClick={()=>this.props.jumpTo(moveNumber)}>{desc}</button>
        });
    }
  
    render() {
        const moves = this.fetchGameHistory();
        return (
        <div>
            <h4 style={{margin: 0}}>Game history</h4>
            <p className="game-description">Position of the next move is defined in format (column, row).</p>
            <div style={{display: 'flex', flexDirection: 'column'}}>{moves}</div>
        </div>
        )
    }
} 

export default History;