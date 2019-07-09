import auth from '../middleware/auth';
import admin from '../middleware/admin';
import Property from '../controllers/propertyController';
import { upload } from '../middleware/multer';
import { Router } from 'express';

const router = Router();


router.post( '/', [auth ,admin], upload.single('image_url'), Property.create);
router.delete( '/:id', [auth ,admin], Property.delete);
router.patch( '/:id', [auth ,admin], Property.update);
router.patch( '/:id/sold', [auth ,admin], Property.mark);
/*router.get( '/', auth , Property.getAll);
router.get( '/?type=propertyType', auth , Property.getAll);*/
router.get( '/:id', auth , Property.getAProperty);



module.exports = router; 

