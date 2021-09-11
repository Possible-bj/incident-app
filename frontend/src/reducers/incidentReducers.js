import {
  INCIDENT_LIST_REQUEST,
  INCIDENT_LIST_SUCCESS,
  INCIDENT_LIST_FAIL,
  INCIDENT_DETAILS_REQUEST,
  INCIDENT_DETAILS_SUCCESS,
  INCIDENT_DETAILS_FAIL,
  INCIDENT_LIST_MY_REQUEST,
  INCIDENT_LIST_MY_SUCCESS,
  INCIDENT_LIST_MY_FAIL,
  INCIDENT_LIST_MY_RESET,
  INCIDENT_SUBMIT_REQUEST,
  INCIDENT_SUBMIT_SUCCESS,
  INCIDENT_SUBMIT_FAIL
} from '../constants/incidentConstants'

export const incidentListReducer = (state = { incidents: [] }, action) => {
  switch (action.type) {
    case INCIDENT_LIST_REQUEST:
      return { loading: true, inidents: [] }
    case INCIDENT_LIST_SUCCESS:
      return { loading: false, incidents: action.payload }
    case INCIDENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const incidentDetailsReducer = (
  state = { incident: { comments: [] } },
  action
) => {
  switch (action.type) {
    case INCIDENT_DETAILS_REQUEST:
      return { loading: true, incident: {} }
    case INCIDENT_DETAILS_SUCCESS:
      return { loading: false, incident: action.payload }
    case INCIDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const incidentListMyReducer = (state = { incidents: [] }, action) => {
  switch (action.type) {
    case INCIDENT_LIST_MY_REQUEST:
      return { loading: true, incidents: [] }
    case INCIDENT_LIST_MY_SUCCESS:
      return { loading: false, incidents: action.payload }
    case INCIDENT_LIST_MY_FAIL:
      return { loading: false, error: action.payload }
    case INCIDENT_LIST_MY_RESET:
      return { incidents: [] }
    default:
      return state
  }
}

export const incidentSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case INCIDENT_SUBMIT_REQUEST:
      return { loading: true }
    case INCIDENT_SUBMIT_SUCCESS:
      return { loading: false, success: true }
    case INCIDENT_SUBMIT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
