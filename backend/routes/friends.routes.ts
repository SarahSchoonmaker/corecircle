import { Router } from "express";
import {
  sendRequest,
  respondToRequest,
  getFriendRequests,
  listFriends,
} from "../controllers/friendController.js";

const router = Router();

router.post("/request", sendRequest);
router.post("/respond", respondToRequest);
router.get("/requests", getFriendRequests);
router.get("/list", listFriends);

export default router;
