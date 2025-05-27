import { Router } from 'express';
import { sendMessage, getMessagesWithFriend } from '../controllers/messageController.js';

const router = Router();

router.post('/', sendMessage);
router.get('/:friendId', getMessagesWithFriend); // get messages between current user and friend

export default router;
