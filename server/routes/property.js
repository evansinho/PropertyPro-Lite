import Property from '../controllers/propertyController';
import { upload } from '../middleware/multer';
import { Router } from 'express';

const router = Router();


router.post( '/', upload.single('image_url'), Property.create);
router.delete( '/:id', Property.delete);
router.patch( '/:id', Property.update);
router.patch( '/:id/sold', Property.mark);
router.get( '/', Property.getAll);
router.get( '/?propType=propertyType', Property.specificPropType);



module.exports = router; 