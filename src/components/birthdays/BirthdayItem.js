import React from 'react'
import { Button, Icon } from 'rsuite'
import { useUser } from '../../context/user.context'
import { db } from '../../misc/firebase'
import { getAge, getNextBirthday,getMonthNameFromDate } from '../../misc/helper_functions'

const BirthdayItem = ({ birthday }) => {
  const { user } = useUser();
  const nextBirthday = getNextBirthday(birthday)

  const handleDelete = () => {
    const birthdayRef = db.ref(`birthdays/${user.uid}/${birthday.id}`)
    birthdayRef.remove()
  }

  const age = getAge(nextBirthday, birthday.birthdate)

  const birthMonthName = getMonthNameFromDate(birthday.birthmonth)

  return (
    <div className="birthday-item">
      <div>
        <h3>{birthday.name}</h3>
        <p className="text-muted">({age} next {birthMonthName})</p>
        <p>Next Birthday: {nextBirthday.toDateString()}</p>
      </div>
      <Button color="red" className="br-circle" size="sm" onClick={handleDelete}><Icon icon="trash2"/></Button>
    </div>
  )
}

export default BirthdayItem
