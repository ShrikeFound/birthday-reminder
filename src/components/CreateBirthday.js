import React, { useCallback, useState } from 'react'
import { Alert, Button, ControlLabel, DatePicker, Form, FormControl, FormGroup, Icon, Modal } from 'rsuite'
import { useModalState } from '../misc/custom-hooks'
import firebase from 'firebase/app'
import { db } from '../misc/firebase'
import { useUser } from '../context/user.context'


const INITIAL_FORM = {
  name: "",
  birthdate: new Date()
}

const CreateBirthday = () => {
  const { user } = useUser();
  const { open, close, isOpen } = useModalState();
  const [formValue,setFormValue] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  //React Suite provides entire form as an object for value instead of the normal event object
  //when using onChange
  
  const handleFormChange = useCallback((val) => {
    setFormValue(val)
  },[])
  
  const handleFormSubmit = async () => {
    setLoading(true)
    const formattedBirthday = (new Date(formValue.birthdate)).getTime()
    const birthdayData = {
      name: formValue.name,
      birthday: formattedBirthday,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    }

    console.log(typeof birthdayData.birthday, typeof birthdayData.createdAt)
    try {
      await db.ref(`birthdays/${user.uid}`).push(birthdayData);


      setLoading(false);
      Alert.success(`${formValue.name} has been saved!`,2000)
      setFormValue(INITIAL_FORM);
      close();

    } catch (error) {
      setLoading(false)
      Alert.error(error.message,2000)
    }

  }



  return (
    <div>
      <Button color="green" onClick={open}>
        <Icon icon="birthday-cake" /> Add New Birthday
      </Button>


      <Modal show={isOpen} onHide={close} style={{maxWidth: "100%"}}>
        <Modal.Header><Modal.Title>New Birthday</Modal.Title></Modal.Header>

        <Modal.Body>
          <Form fluid onChange={handleFormChange} formValue={formValue}>
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl name="name"></FormControl>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Birthdate</ControlLabel>
              <FormControl accepter={DatePicker} oneTap style={{ width: 280 }} name="birthdate"></FormControl>
            </FormGroup>


          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button block color="green" onClick={handleFormSubmit} disabled={loading}>
            Save new Birthday
          </Button>
        </Modal.Footer>

      </Modal>

      

    </div>
  )
}

export default CreateBirthday
