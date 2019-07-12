import User from '../controllers/userController';
import { Router } from 'express';

const router = Router();


router.post( '/signup', User.signUp);
router.post( '/signin', User.signIn);
/*router.post( '/forgot_password', User.forgot_password);
router.post( '/user_mail/reset_password', User.reset_password);
*/
module.exports = router;