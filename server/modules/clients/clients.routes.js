import express from 'express';
import clientsControllers from './clients.controllers.js';
const router = express.Router();

router.get('/', clientsControllers.getClientsData);
router.post('/addClient',clientsControllers.addClient);

export default router;