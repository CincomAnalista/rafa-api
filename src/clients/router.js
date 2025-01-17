import { Router } from 'express';
import { getClients, getClientTime } from './controller.js';
import { ClientsFromOdoo } from '../services/index.js';

const router = Router();

router.get('/', getClients);

router.get('/time', getClientTime);

// Peticiones para actualizar datos de odoo
router.put('/', async (req, res) => {
  try {
    const result = await ClientsFromOdoo();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;