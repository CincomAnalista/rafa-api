import { Router } from 'express';
import { getClient, getClientTime, getAllClients } from './controller.js';
import { ClientNamesFromOdoo, ClientsFromOdoo } from '../services/index.js';

const router = Router();

router.get('/', getClient);

// router.get('/numbers', getAllNumbersClients);

// router.post('/numbers', insertNumbers);

router.get('/time', getClientTime);


// Peticiones para actualizar datos de odoo
router.put('/clients', async (req, res) => {
  try {
    const result = await ClientNamesFromOdoo();
    res.status(200).send(result);
  } catch (error) {}
});

router.put('/', async (req, res) => {
  try {
    const result = await ClientsFromOdoo();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
