import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { listIncidentDetails } from '../actions/incidentActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const IncidentScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const { loading, error, incident } = useSelector(
    state => state.incidentDetails
  )
  useEffect(() => {
    dispatch(listIncidentDetails(match.params.id))
  }, [dispatch, match])

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> {error} </Message>
      ) : (
        <Row>
          <Col md={3}>
            <Image src={incident.image} alt={incident.name} fluid />
          </Col>
          <Col md={9}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{incident.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Location: {incident.location}</ListGroup.Item>
              <ListGroup.Item>{incident.body}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  )
}

export default IncidentScreen
