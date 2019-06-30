import express from 'express';
import user from './user';

const router = express.Router();

router.use('/api/v1', user);

module.exports = router;