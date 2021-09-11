import axios from 'axios'
import {
  INCIDENT_LIST_REQUEST,
  INCIDENT_LIST_SUCCESS,
  INCIDENT_LIST_FAIL,
  INCIDENT_DETAILS_REQUEST,
  INCIDENT_DETAILS_SUCCESS,
  INCIDENT_DETAILS_FAIL,
  INCIDENT_LIST_MY_REQUEST,
  INCIDENT_LIST_MY_FAIL,
  INCIDENT_LIST_MY_SUCCESS,
  INCIDENT_SUBMIT_REQUEST,
  INCIDENT_SUBMIT_SUCCESS,
  INCIDENT_SUBMIT_FAIL
} from '../constants/incidentConstants'

export const listIncidents = () => async dispatch => {
  try {
    dispatch({ type: INCIDENT_LIST_REQUEST })
    const { data } = await axios.get('/api/incidents')

    dispatch({ type: INCIDENT_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INCIDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listIncidentDetails = id => async dispatch => {
  try {
    dispatch({ type: INCIDENT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/incidents/${id}`)

    dispatch({ type: INCIDENT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INCIDENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const listMyIncidents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INCIDENT_LIST_MY_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get('/api/incidents/myincidents', config)

    dispatch({ type: INCIDENT_LIST_MY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: INCIDENT_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const submitIncident = incident => async (dispatch, getState) => {
  try {
    dispatch({ type: INCIDENT_SUBMIT_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    await axios.post('/api/incidents', { ...incident }, config)

    dispatch({ type: INCIDENT_SUBMIT_SUCCESS })
  } catch (error) {
    dispatch({
      type: INCIDENT_SUBMIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
