import React from 'react'
import { useBirthdays } from '../../context/birthdays.context'
import BirthdayItem from './BirthdayItem'

const BirthdayList = (userID) => {

  const birthdays = useBirthdays()
  console.log("these birthdays: ",birthdays)
  console.log("length: ", birthdays.length)
  
  return (
    <div>
      <ul className="birthday-list">
      {birthdays.length > 0 && birthdays.map(birthday => {
        return(
        <li key={birthday.id}>
            <BirthdayItem birthday={birthday}/>
        </li>
        )
      })}
      </ul>
    </div>
  )
}

export default BirthdayList
