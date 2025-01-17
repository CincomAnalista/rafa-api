import { ClientModel } from './model.js';

export const get = async () => {
  const result = await ClientModel.find({});
  return result;
};

export const getTime = async () => {
  const result = await ClientModel.find({}).limit(1).sort({ lastUpdate: -1 });
  return result;
};