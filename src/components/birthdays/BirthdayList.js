import React from 'react'
import { useBirthdays } from '../../context/birthdays.context'
import BirthdayItem from './BirthdayItem'

const BirthdayList = (userID) => {
  const today = new Date();
  console.log("today: ", today);
  const birthdays = useBirthdays()
  
  birthdays.sort((a, b) => {
    console.log(today.getFullYear(),a.birthmonth,b.birthday)
    const nextBirthdayA = new Date(today.getFullYear(),a.birthmonth,b.birthday)
    const nextBirthdayB = new Date(today.getFullYear(), b.birthmonth, b.birthday)
    console.log(nextBirthdayA,nextBirthdayB)
    return nextBirthdayA - nextBirthdayB
  })

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
