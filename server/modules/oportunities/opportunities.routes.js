import express from 'express';
import opportunitiesControllers from './opportunities.controllers.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { opportunitySchema } from '../../schemas/addOpportunitySchema.js';
const router = express.Router();

router.get('/client/:clientId', opportunitiesControllers.getOpportunitiesByClient);
router.post('/addOpportunity', validateForm(opportunitySchema), opportunitiesControllers.addOpportunity);
router.get('/export', opportunitiesControllers.exportOpportunities);

export default router;
