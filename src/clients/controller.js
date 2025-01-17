import { get, getTime } from './service.js';

export const getClients = (req, res) => {
  get()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500).send(error));
};

export const getClientTime = (req, res) => {
  getTime()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500));
};