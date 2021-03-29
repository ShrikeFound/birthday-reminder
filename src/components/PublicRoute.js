import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useUser } from '../context/user.context';

const PublicRoute = ({ children, ...routeProps }) => {
  const { user, loading } = useUser();
  

  if (loading && !user) {
    <Container>
      <Loader center vertical size="md" content="Loading" speed="slow"/>
    </Container>
  }


  if (user && !loading) {
    console.log("there's a user signed on, dont' look at the signin page")
    return <Redirect to="/"/>
  }
  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PublicRoute
