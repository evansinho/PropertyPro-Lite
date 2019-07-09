import Flag from '../controllers/flagController';
import { Router } from 'express';

const router = Router();


router.post( '/', Flag.createFlag);



module.exports = router;