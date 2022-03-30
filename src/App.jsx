import './App.scss';
import {useState, useEffect, createContext} from 'react'
import Board from './components/Board/Board';
import Keyboard from './components/Keyboard/Keyboard';

export const AppContext = createContext()

const App = () => {

  const [words, setWords] = useState([])
  const [todaysWord, setTodaysWord] = useState({})
  const [play, setPlay] = useState(true)
  
  const [board, setBoard] = useState([
                                        ["", "", "", "", ""],
                                        ["", "", "", "", ""],
                                        ["", "", "", "", ""],
                                        ["", "", "", "", ""],
                                        ["", "", "", "", ""],
                                        ["", "", "", "", ""]

                                      ])
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [invalidKeys, setInvalidKeys] = useState([])
  const [validKeys, setValidKeys] = useState([])
  const [correctPositionKeys, setCorrectPositionKeys] = useState([])

  const d = new Date().getDate()

  useEffect(() => {
    
    const schedule = require('node-schedule');
    const job = schedule.scheduleJob('* 20-21 * * *', () => {
      setPlay(true)
    });
    
    if (localStorage.getItem("words")) setWords(JSON.parse(localStorage.getItem("words")))

    else {
      fetch("https://random-word-api.herokuapp.com/all")
      .then(res => res.json())
      .then(res => {
        const filteredRes = res.filter(ele => ele.length === 5)
        setWords(filteredRes)
        localStorage.setItem("words", JSON.stringify(filteredRes))
      })
      .catch(err => console.log(err))
    }
  
  }, [])

  
  
  useEffect(() => {
    
    if (localStorage.getItem("todaysWord")) {
      
      const temp = JSON.parse(localStorage.getItem("todaysWord"))
      
      if (temp.id === d && temp.word) setTodaysWord(temp)
      
      
      else {
        if (words.length) {
        const tempWord = {
                          id: d,
                          word: words[Math.floor(Math.random() * words.length)] 
                        }
        setTodaysWord(tempWord)
        localStorage.setItem("todaysWord", JSON.stringify(tempWord))               
      }}
    } 
    
    else {
      if (words.length) {
      const tempWord = {
        id: d,
        word: words[Math.floor(Math.random() * words.length)]
      }
      setTodaysWord(tempWord)
      localStorage.setItem("todaysWord", JSON.stringify(tempWord))
    }}

  }, [words, d])


  
  
  
  const handleKeyClick = keyVal => {
    
    if (keyVal === "Enter") {
      
      if (currentCol < 5) alert("Not enough letters!")
      
      else if (currentCol === 5) {
        const attemptedWord = board[currentRow][0] + board[currentRow][1] + board[currentRow][2] + board[currentRow][3] + board[currentRow][4]
        
        if (words.includes(attemptedWord.toLowerCase())) {
          
          if (todaysWord.word === attemptedWord.toLowerCase()) {
            alert("You win!")
            setCurrentRow(6)
            setCurrentCol(6)
          } 
          else if (currentRow === 5) alert(`Todays word was ${todaysWord.word}`)
          else {
            setCurrentRow(r => r < 5 ? r + 1 : r)
            setCurrentCol(0)
          }
          
        } else alert("Word not in list!")
        
      }

    } 
    
    
    else if (keyVal === "Delete") {
        
      if (currentCol > 0) {
          
          const tempBoard = [...board]
          tempBoard[currentRow][currentCol-1] = ""
          setBoard(tempBoard)
          setCurrentCol(c => c - 1)
        } 
    } 
    
    else {
      
      if (currentRow < 6  && currentCol < 5 && !board[currentRow][currentCol]) {
         const tempBoard = [...board]
         tempBoard[currentRow][currentCol] = keyVal
         setBoard(tempBoard)
         setCurrentCol(c => c < 5 ? c + 1: c)
       }

    }
  
  }

  

  return (
    <div className="App">
      
      <nav>
        <h1>
          Wordle
        </h1>
        <hr />
      </nav>
      
      <main>
        {play ? (<AppContext.Provider value={{board, handleKeyClick, todaysWord, currentRow, invalidKeys, setInvalidKeys, validKeys, setValidKeys, correctPositionKeys, setCorrectPositionKeys}}>
            <Board/>
            <Keyboard />
          </AppContext.Provider>) : <h2>You can play only between 8pm-9pm!</h2>}
      </main>
      
  </div>
  );
}

export default App;



