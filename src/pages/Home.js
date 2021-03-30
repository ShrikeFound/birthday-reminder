import React, { useCallback } from 'react'
import { Button, Grid } from 'rsuite'
import CreateBirthday from '../components/CreateBirthday';
import { useUser } from '../context/user.context'
import { auth } from '../misc/firebase';

const Home = () => {

  const { user } = useUser();
  const handleSignOut = useCallback(() => {
    auth.signOut();
  },[])

  return (
    <Grid fluid className="h-100 text-center">
      <div>
        <h1>Birthday Reminders</h1>
        <h3>for {user.name}</h3>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
      
      <div>
        <CreateBirthday/>  
        Birthday List
      </div>
    </Grid>
  )
}

export default Home
