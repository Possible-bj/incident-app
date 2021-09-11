import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import IncidentScreen from './screens/IncidentScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import SubmitIncidentScreen from './screens/SubmitIncidentScreen'

const App = () => (
  <Router>
    <Header />
    <main className='py-3'>
      <Switch>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route
            path='/submitincident'
            component={SubmitIncidentScreen}
            exact
          />
          <Route path='/incident/:id' component={IncidentScreen} exact />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </Switch>
    </main>
    <Footer />
  </Router>
)

export default App
