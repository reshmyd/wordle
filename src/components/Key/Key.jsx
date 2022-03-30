import './Key.scss'
import { useContext } from 'react'
import { AppContext } from '../../App'


const Key = ({value}) => {
  const {invalidKeys, validKeys, correctPositionKeys} = useContext(AppContext)

  let style = ""
  if (correctPositionKeys.includes(value)) style = "correctPosition"
  else if (validKeys.includes(value)) style = "valid"
  else if (invalidKeys.includes(value)) style = "invalid"

  return (
    <div className={`key ${style}`}>{value}</div>
  )
}

export default Key