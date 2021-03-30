import React from 'react'
import { Button, Icon, Grid } from 'rsuite'
import { useUser } from '../../context/user.context'
import { db } from '../../misc/firebase'

const BirthdayItem = ({ birthday }) => {
  const { user } = useUser();
  const formattedDate = (new Date(birthday.birthday)).toDateString()
  console.log(new Date(birthday.birthday))

  const handleDelete = () => {
    const birthdayRef = db.ref(`birthdays/${user.uid}`)
    birthdayRef.remove()
  }

  return (
    <div className="birthday-item">
      <div>
        <h3>{birthday.name}</h3>
        <p>Birthday: {formattedDate}</p>
      </div>
      <Button color="red" className="br-circle" size="sm" onClick={handleDelete}><Icon icon="trash2"/></Button>
    </div>
  )
}

export default BirthdayItem
