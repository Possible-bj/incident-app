import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Incident from '../components/Incident'
import { listIncidents } from '../actions/incidentActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { loading, incidents, error } = useSelector(state => state.incidentList)

  useEffect(() => {
    dispatch(listIncidents())
  }, [dispatch])

  return (
    <>
      <h1>Latest Incidents </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {incidents.map(incident => (
            <Col key={incident._id} sm={12} md={6} lg={4} xl={3}>
              <Incident incident={incident} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
