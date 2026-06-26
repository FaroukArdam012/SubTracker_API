import { Router } from "express";
import { sendReminders } from "../controller/workflowController.js";
const wfRouter= Router();

wfRouter.post('/subscription/reminder',sendReminders);

export default wfRouter;