import asyncHandler from 'express-async-handler'
import Incident from '../models/incidentModel.js'

// @desc Fetch all incidents
// @route GET /api/incidents
// @access Public
export const getIncidents = asyncHandler(async (req, res) => {
  const incidents = await Incident.find({})

  res.json(incidents)
})

// @desc Fetch a single incident
// @route GET /api/incidents/:id
// @access Public
export const getIncidentById = asyncHandler(async (req, res) => {
  const incident = await Incident.findById(req.params.id)

  if (!incident) {
    res.status(404)
    throw new Error('Incident not found')
  }

  res.json(incident)
})

// @desc Fetch logged in users incidents
// @route GET /api/incidents/myincidents
// @access Private
export const getMyIncidents = asyncHandler(async (req, res) => {
  await req.user.populate('incidents').execPopulate()
  // const incidents = await Incident.find({ user: req.user._id })

  if (!req.user.incidents) {
    res.status(404)
    throw new Error('You have submitted no incident')
  }

  res.json(req.user.incidents)
})

// @desc    Submit new incident
// @route   POST /api/incidents
// @access  Private
export const submitIncidents = asyncHandler(async (req, res) => {
  const incident = await Incident.create({ ...req.body, user: req.user._id })

  if (!incident) {
    res.status(400)
    throw new Error('Invalid incident data')
  }

  res.status(201).json(incident)
})
