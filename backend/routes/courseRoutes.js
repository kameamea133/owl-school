import express from 'express';
import { protect} from '../middleware/authMiddleware.js';
import { createCourse, updateCourse, deleteCourse, getCourses, enrollInCourse } from '../controllers/courseController.js';

const router = express.Router();


router.use(protect);

router
  .route('/')
  .get(getCourses)
  .post(createCourse);

router
  .route('/:id')
  .put(updateCourse)
  .delete(deleteCourse);

router.post('/:id/enroll', enrollInCourse);

export default router;
