import User from '../controllers/userController';
import { Router } from 'express';

const router = Router();


router.post( '/signup', User.signUp);
router.post( '/signin', User.signIn);


module.exports = router;