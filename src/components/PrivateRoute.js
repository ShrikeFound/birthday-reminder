import React from 'react'
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ children, ...routeProps }) => {
  
  const user = false;
  if (!user) {
    return <Redirect to="/signin"/>
  }
  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PrivateRoute
