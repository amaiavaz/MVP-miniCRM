import express from 'express';
import opportunitiesControllers from './opportunities.controllers.js';
const router = express.Router();

router.get('/:clientId', opportunitiesControllers.getOpportunitiesByClient);
router.post('/addOpportunity', opportunitiesControllers.addOpportunity);

export default router;
