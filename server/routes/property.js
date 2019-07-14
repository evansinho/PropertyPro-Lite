import auth from '../middleware/auth';
import Property from '../controllers/propertyController';
import { upload } from '../middleware/multer';
import { Router } from 'express';

const router = Router();


router.post( '/', auth ,  upload.single('image_url'), Property.create);
router.delete( '/:id', auth , Property.delete);
router.patch( '/:id', auth , Property.update);
router.patch( '/:id/sold', auth , Property.mark);
router.get( '/', auth , Property.getAll);
router.get( '/?type=propertyType', auth , Property.getAll);
router.get( '/:id', auth , Property.getAProperty);



module.exports = router; 

