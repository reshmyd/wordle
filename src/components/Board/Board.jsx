import './Board.scss'
import {useContext} from 'react'
import Letter from '../Letter/Letter'
import { AppContext } from '../../App'


const Board = () => {

  const { board } = useContext(AppContext)

  return (
    <div className='board'>
      
      
      <div className='board_row'>
        {board[0].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={0} />)}
      </div>

      
      <div className='board_row'> 
        {board[1].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={1} />)}
      </div>

      
      <div className='board_row'>
        {board[2].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={2} />)}
      </div>

      
      <div className='board_row'>
        {board[3].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={3} />)}
      </div>

      
      <div className='board_row'>
        {board[4].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={4} />)}
      </div>

      
      <div className='board_row'>
        {board[5].map((elem, i) => <Letter value={elem} key={i + 1} col={i} row={5} />)}
      </div>
                               

    </div>
  )
}

export default Board