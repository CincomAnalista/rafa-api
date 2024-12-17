import { ClientModel } from './model.js';

export const get = async () => {
  try {
    const result = await ClientModel.find({})
      .then((result) => result)
      .catch((error) => error);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getTime = async () => {
  try {
    const result = await ClientModel.find({})
      .limit(1)
      .sort({ lastUpdate: -1 })
      .then((result) => result)
      .catch((error) => error);
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
