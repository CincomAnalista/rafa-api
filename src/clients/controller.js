import { ClientModel } from './model.js';

export const getClient = (req, res) => {
  get()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500));
};

export const getClientTime = (req, res) => {
  getTime()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(500));
};

async function get() {
  const result = await ClientModel.find({})
    .then((result) => result)
    .catch((error) => error);
  return result;
}

async function getTime() {
  const result = await ClientModel.find({})
    .limit(1)
    .sort({ lastUpdate: -1 })
    .then((result) => result)
    .catch((error) => error);
  return result;
}
