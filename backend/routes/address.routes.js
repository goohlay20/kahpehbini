import { Router } from "express";
import { getRegions } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.get("/", getRegions);

export default addressRouter;