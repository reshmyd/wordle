import './Letter.scss'

const Letter = ({value, col, row, letterStyle}) => {
  
  return (
    <div className={letterStyle}>{value}</div>
  )
}

export default Letter



