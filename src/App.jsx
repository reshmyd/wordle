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
  
const [letterStyle, setLetterStyle] = useState([
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



  const handleStyling = attemptedWord => {
    
    const tempStyleArr = [...letterStyle]
    const todaysWordArr = todaysWord.word.split('')
    
    for(let i = 0; i < 5; i++) {
      
      if (attemptedWord[i].toLowerCase() === todaysWord.word[i]) {
        console.log('correct')
        tempStyleArr[currentRow][i] = "correctPosition"
        todaysWordArr.splice(i, 1)
        if (!correctPositionKeys.includes(attemptedWord[i])) setCorrectPositionKeys(k => [...k, attemptedWord[i]])
      } 
      else if (todaysWordArr.includes(attemptedWord[i].toLowerCase())) {
        tempStyleArr[currentRow][i] = "valid"
        if (!correctPositionKeys.includes(attemptedWord[i]) && !validKeys.includes(attemptedWord[i])) setValidKeys(k => [...k, attemptedWord[i]])
      }
      else {
        tempStyleArr[currentRow][i] = "invalid"
        if (!invalidKeys.includes(attemptedWord[i])) setInvalidKeys(k => [...k, attemptedWord[i]])
      } 
    }   
      
    setLetterStyle(tempStyleArr)
  }


  
  const onEnter = () => {
    
    if (currentCol < 5) alert("Not enough letters!")
    
    else if (currentCol === 5) {
      const attemptedWord = board[currentRow][0] + board[currentRow][1] + board[currentRow][2] + board[currentRow][3] + board[currentRow][4]
      
      if (words.includes(attemptedWord.toLowerCase())) {

        handleStyling(attemptedWord)
        
        if (todaysWord.word === attemptedWord.toLowerCase()) {
          setCurrentRow(6)
          setCurrentCol(6)
          alert("You win!")
        } 
        else if (currentRow === 5) alert(`Todays word was ${todaysWord.word}`)
        else {
          setCurrentRow(r => r < 5 ? r + 1 : r)
          setCurrentCol(0)
        }
        
      } else alert("Word not in list!")
      
    }

  }



  const onDelete = () => {

    if (currentCol > 0) {
      const tempBoard = [...board]
      tempBoard[currentRow][currentCol-1] = ""
      setBoard(tempBoard)
      setCurrentCol(c => c - 1)
    } 

  }
  
  
  
  const handleKeyClick = keyVal => {
    
    if (keyVal === "Enter") onEnter()
    
    else if (keyVal === "Delete") onDelete()
    
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
        {play ? (<AppContext.Provider value={{board, handleKeyClick, todaysWord, currentRow, invalidKeys, setInvalidKeys, validKeys, setValidKeys, correctPositionKeys, setCorrectPositionKeys, letterStyle}}>
            <Board/>
            <Keyboard />
          </AppContext.Provider>) : <h2>You can play only between 8pm-9pm!</h2>}
      </main>
      
  </div>
  );
}

export default App;



