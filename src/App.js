import React from 'react'
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import './styles/main.scss'
import { UserProvider } from './context/user.context';


const App = () => {
  return (
    <UserProvider>
      <Switch>
        
        <PublicRoute path="/signin">
          <SignIn/>
        </PublicRoute>

        <PrivateRoute>
          <Home />
        </PrivateRoute>
        
      </Switch>
    </UserProvider>
    
  )
}

export default App
