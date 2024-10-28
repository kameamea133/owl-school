import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the course'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the course'],
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  content: [
    {
      type: String, 
      required: true,
    },
  ],
  headerImage: {
    type: String, 
    required: false, 
    
  },
  categories: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, { timestamps: true }); 

const Course = mongoose.model('Course', courseSchema);

export default Course;
