import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Incident = ({ incident }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/incident/${incident._id}`}>
        <Card.Img src={incident.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/incident/${incident._id}`}>
          <Card.Title as='div'>
            <strong>{incident.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Incident
