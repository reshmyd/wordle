import './Letter.scss'
import { AppContext } from '../../App'
import { useContext, useEffect } from 'react'

const Letter = ({value, col, row}) => {
  const {todaysWord, currentRow, invalidKeys, setInvalidKeys, validKeys, setValidKeys, correctPositionKeys, setCorrectPositionKeys} = useContext(AppContext)

  let correctPosition, valid, style

  if (todaysWord.word) {
    correctPosition = todaysWord.word[col] === value.toLowerCase()
    valid = !correctPosition && todaysWord.word.includes(value.toLowerCase()) && value != ""
    style = correctPosition ? "correctPosition" : valid ? "valid" : "invalid"
  }

  useEffect(() => {
    if (value !== "" && !correctPosition && !valid) {
      if (!invalidKeys.includes(value)) setInvalidKeys(k => [...k, value])
    } 
    else if (valid) {
      if (!validKeys.includes(value)) setValidKeys(k => [...k, value])
    } 
    else if (correctPosition) {
      if (!correctPositionKeys.includes(value)) setCorrectPositionKeys(k => [...k, value])
    }

  }, [currentRow])
  
  
  return (
    <div className={currentRow > row ? style : ""}>{value}</div>
  )
}

export default Letter



