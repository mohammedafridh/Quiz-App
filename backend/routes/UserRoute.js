import express from 'express';
import { saveAssessmentDetails, viewAllAssessmentDetails } from '../controllers/UserDataController.js';

const router = express.Router();

router.post('/create', saveAssessmentDetails);
router.get('/viewAll', viewAllAssessmentDetails);

export default router;
