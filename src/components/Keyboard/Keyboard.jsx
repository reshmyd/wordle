import './Keyboard.scss'
import Key from '../Key/Key'
import { useContext } from 'react'
import { AppContext } from '../../App'



const Keyboard = () => {

  const {handleKeyClick} = useContext(AppContext)
  
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"];

  return (
    <div className='keyboard'>
      
      <div className='keyboard_row'>
        {keys1.map((elem, i) => (<div key={i + 1} onClick={() => handleKeyClick(elem)}> 
                                   <Key value={elem} />
                                 </div>))}
      </div>

      <div className='keyboard_row'>
        {keys2.map((elem, i) => (<div key={i + 1} onClick={() => handleKeyClick(elem)}> 
                                   <Key value={elem} />
                                 </div>))}
      </div>

      <div className='keyboard_row'>
        {keys3.map((elem, i) => (<div key={i + 1} onClick={() => handleKeyClick(elem)}> 
                                   <Key value={elem} />
                                 </div>))}
      </div>

    </div>
  )
}

export default Keyboard