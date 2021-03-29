import React from 'react'
import { Redirect, Route } from 'react-router';

const PublicRoute = ({ children, ...routeProps }) => {
  const user = false;
  if (user) {
    console.log("there's a use sign on, dont' look at the signin page")
    return <Redirect to="/"/>
  }
  return (
    <Route {...routeProps}>
      {children}
    </Route>
  )
}

export default PublicRoute
