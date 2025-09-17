import express from 'express';
import clientsControllers from './clients.controllers';
const router = express.Router();

router.get('/clients', clientsControllers.getClientsData);

export default router;