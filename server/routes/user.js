import express from 'express';
import { follow, getuserInfo, register, signin, unfollow } from '../controller/users.js';
import auth from '../middleware/auth.js';


const router = express.Router();

router.post('/signin', signin);
router.post('/register', register);
router.get('/:user', getuserInfo);
router.post('/:username', auth, follow);
router.delete('/:username', auth, unfollow);

export default router;