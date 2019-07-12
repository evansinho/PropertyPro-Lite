import auth from '../middleware/auth';
import Flag from '../controllers/flagController';
import { Router } from 'express';

const router = Router();


router.post( '/', auth, Flag.createFlag);



module.exports = router;