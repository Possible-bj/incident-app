import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const incidentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    body: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
)

const Incident = mongoose.model('Incident', incidentSchema)

export default Incident
