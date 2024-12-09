import { OdooClient } from "odoo-client-jsonrpc";
import { odooConfig } from "../config/index.js";

export const odoo = new OdooClient({
    url: odooConfig.ODOO_URL,
    db: odooConfig.ODOO_DB,
    username: odooConfig.ODOO_USERNAME,
    password: odooConfig.ODOO_PASSWORD,
})