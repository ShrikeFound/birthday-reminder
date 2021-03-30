import React from 'react'
import firebase from 'firebase/app'
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite'
import { auth, db } from '../misc/firebase'
import cupcakeLogo from '../images/cupcake.svg'



const SignIn = () => {

  const handleSignIn = async () => {
    
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      if (additionalUserInfo.isNewUser) {
        await db.ref(`/users/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP

        })
      }

      Alert.success("Signed in!",2500)
    } catch (error) {
      Alert.error(error.message,2500)
    }



  }



  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="logo-large mt-2 mb-3">
                  <img  alt="cupcake logo" src={cupcakeLogo} />
                </div>
              <div className="text-center">
                <h2>Birthday Reminder App</h2>
                <p>Please sign in and stop forgetting birthdays!</p>
              </div>
              <div className="mt-3">
                
                <Button block color="green" onClick={handleSignIn}>
                  <Icon icon="google"/> Sign in with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}

export default SignIn
