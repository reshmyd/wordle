import './App.scss';
import {useState, useEffect} from 'react'

const App = () => {

  const [words, setWords] = useState([])
  const [todaysWord, setTodaysWord] = useState({})
  const [play, setPlay] = useState(false)

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
        // console.log(res)
        const filteredRes = res.filter(ele => ele.length === 5)
        setWords(filteredRes)
        // console.log(filteredRes)
        localStorage.setItem("words", JSON.stringify(filteredRes))
        
      })
      .catch(err => console.log(err))
    }
    
    
    
    if (localStorage.getItem("todaysWord")) {
      const temp = JSON.parse(localStorage.getItem("todaysWord"))
      if (temp.id === d) setTodaysWord(temp)
      else {
        const tempWord = {
                          id: d,
                          word: words[Math.floor(Math.random() * words.length)] 
                        }
        setTodaysWord(tempWord)
        localStorage.setItem("todaysWord", JSON.stringify(tempWord))               
        
      }
    } 
    else {
      const tempWord = {
        id: d,
        word: words[Math.floor(Math.random() * words.length)]
      }
      setTodaysWord(tempWord)
      localStorage.setItem("todaysWord", JSON.stringify(tempWord))

    }

  }, [])

   
  
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
