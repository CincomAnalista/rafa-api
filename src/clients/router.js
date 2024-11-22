import { Router } from "express";
import { getClient, getClientTime } from "./controller.js";

const router = Router();

router.get("/", getClient);

router.get("/time", getClientTime);


export default router;