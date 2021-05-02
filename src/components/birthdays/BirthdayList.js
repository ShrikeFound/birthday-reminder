import React from 'react'
import { useBirthdays } from '../../context/birthdays.context'
import { getNextBirthday } from '../../misc/helper_functions'
import BirthdayItem from './BirthdayItem'

const BirthdayList = (userID) => {
  const birthdays = useBirthdays()
  
  

  birthdays.sort((a, b) => {
    const nextBirthdayA = getNextBirthday(a)
    const nextBirthdayB = getNextBirthday(b)
    return nextBirthdayA - nextBirthdayB
  })
  birthdays.forEach(b => {
    console.log(getNextBirthday(b))
  });
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
