import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyIncidents } from '../actions/incidentActions'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const incidentListMy = useSelector(state => state.incidentListMy)
  const {
    loading: loadingIncidents,
    error: errorIncidents,
    incidents
  } = incidentListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    if (!user.name) {
      dispatch(getUserDetails('profile'))
      dispatch(listMyIncidents())
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='controlPassword'>
            <Form.Label>confirmPassword</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My incidents</h1>
        {loadingIncidents ? (
          <Loader />
        ) : errorIncidents ? (
          <Message variant='danger'>{errorIncidents}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>LOCATION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(incident => (
                <tr key={incident._id}>
                  <td>{incident._id}</td>
                  <td>{incident.createdAt.substring(0, 10)}</td>
                  <td>{incident.title}</td>
                  <td>{incident.category}</td>
                  <td>{incident.location}</td>
                  <td>
                    <LinkContainer to={`/incident/${incident._id}`}>
                      <Button variant='light' className='btn-sm'>
                        {' '}
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default RegisterScreen
