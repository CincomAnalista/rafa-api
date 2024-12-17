import { odoo } from '../config/odoo.js';
import { ClientNameModel } from '../clients/model.js';

export const  ClientNamesFromOdoo = async () => {
     try {
        await odoo.connection();
        const result = await odoo.resModel.partner({
          personalized: ['customer_rank', '>', '0'],
          fields: ['name']
        });
    
        const clients = result.map((client) => ({ Cliente: client.name }));
    
        await ClientNameModel.deleteMany({});
        await ClientNameModel.insertMany(clients);
        return clients;
      } catch (error) {
        console.error(error);
        return error;
      } finally {
        odoo.Disconnect();
      }
}