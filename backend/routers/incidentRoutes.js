import express from 'express'
import {
  getIncidents,
  getIncidentById,
  getMyIncidents,
  submitIncidents
} from '../controllers/incidentController.js'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').get(getIncidents).post(protect, submitIncidents)

router.route('/myincidents').get(protect, getMyIncidents)
router.route('/:id').get(getIncidentById)
export default router
