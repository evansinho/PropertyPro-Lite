import Property from '../controllers/propertyController';
import { upload } from '../middleware/multer';
import { Router } from 'express';

const router = Router();


router.post( '/', upload.single('image_url'), Property.create);
router.delete( '/:id', Property.delete);


module.exports = router;