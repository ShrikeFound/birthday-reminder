import React, { useCallback } from 'react'
import { Button, Divider, Grid, Row,Col } from 'rsuite'
import BirthdayList from '../components/birthdays/BirthdayList';
import CreateBirthday from '../components/CreateBirthday';
import { BirthdaysProvider } from '../context/birthdays.context';
import { useUser } from '../context/user.context'
import { auth } from '../misc/firebase';
import cupcakeLogo from '../images/cupcake.svg'

const Home = () => {

  const { user } = useUser();
  const handleSignOut = useCallback(() => {
    auth.signOut();
  },[])

  return (
    <BirthdaysProvider>
      <Grid fluid className="h-100 text-center">        
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <div>
              <div className="logo-large mt-3">
                  <img alt="cupcake logo" src={cupcakeLogo} />
                </div>
            <h2>Birthday Reminders</h2>
            <h6>for {user.name}</h6>
            <Button className="mt-1 bt-1" onClick={handleSignOut}>Sign Out</Button>
            </div>
          
            <div>
            <CreateBirthday/>  
              <Divider>Birthdays</Divider>
              <BirthdayList/>
            </div>
          </Col>
        </Row>
      </Grid>
    </BirthdaysProvider>
    
  )
}

export default Home
