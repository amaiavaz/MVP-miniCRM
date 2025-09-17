import express from 'express';
import clientsControllers from './clients.controllers.js';
import { validateForm } from '../../middlewares/validateForm.js';
import { clientSchema } from '../../schemas/addClientSchema.js';
const router = express.Router();

router.get('/', clientsControllers.getClientsData);
router.post('/addClient', validateForm(clientSchema), clientsControllers.addClient);
router.get('/export', clientsControllers.exportClients);

export default router;