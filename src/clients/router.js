import { Router } from "express";
import { getClient, getClientTime } from "./controller.js";
import { getClients } from "./service.js";

const router = Router();

router.get("/", getClient);

router.get("/time", getClientTime);

router.put('/', async (req, res) => {
    try {
        const result = await getClients();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})


export default router;