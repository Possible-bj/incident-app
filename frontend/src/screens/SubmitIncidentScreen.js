import React, { useState, useEffect } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
// import { getUserDetails } from '../actions/userActions'
import { submitIncident } from '../actions/incidentActions'

const SubmitIncidentScreen = ({ history }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  // const userDetails = useSelector(state => state.userDetails)
  // const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
    // if (!user.name) {
    //   dispatch(getUserDetails('profile'))
    //   dispatch(listMyIncidents())
    // } else {
    //   setTitle(user.title)
    //   setBody(user.body)
    // }
  }, [dispatch, history, userInfo])

  const submitHandler = e => {
    e.preventDefault()

    if (title && body && location && category) {
      dispatch(submitIncident({ title, body, location, category, image }))
    } else {
      setMessage('Please Provide all incident data!')
    }
  }

  return (
    <Row>
      <Col md={9}>
        <h2>Submit an Incident</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {/* {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Title'
              value={title}
              onChange={e => setTitle(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Category'
              value={category}
              onChange={e => setCategory(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter location'
              value={location}
              onChange={e => setLocation(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='body'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              as='textarea'
              type='text'
              placeholder='Enter body'
              value={body}
              onChange={e => setBody(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='file'
              placeholder='Enter image'
              value={image}
              onChange={e => setImage(e.target.value)}></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default SubmitIncidentScreen
