import './Board.scss'
import {useContext} from 'react'
import Letter from '../Letter/Letter'
import { AppContext } from '../../App'


const Board = () => {

  const { board, letterStyle } = useContext(AppContext)

  return (
    <div className='board'>
      
      
      <div className='board_row'>
        {board[0].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={0} letterStyle={letterStyle[0][i]} />)}
      </div>

      
      <div className='board_row'> 
        {board[1].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={1} letterStyle={letterStyle[1][i]} />)}
      </div>

      
      <div className='board_row'>
        {board[2].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={2} letterStyle={letterStyle[2][i]} />)}
      </div>

      
      <div className='board_row'>
        {board[3].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={3} letterStyle={letterStyle[3][i]} />)}
      </div>

      
      <div className='board_row'>
        {board[4].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={4} letterStyle={letterStyle[4][i]} />)}
      </div>

      
      <div className='board_row'>
        {board[5].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={5} letterStyle={letterStyle[5][i]} />)}
      </div>
                               

    </div>
  )
}

export default Board