import express from 'express';
import { getCustomers,getCustomersId,postCustomers,putCustomers} from '../controllers/customersController.js';
import { getCustomersIdValidation, postCustomersValidation,getCustomersValidation, putCustomersValidation} from '../middlewares/customersMiddleware.js';

const router=express.Router();

router.get('/customers',getCustomersValidation,getCustomers);
router.get('/customers/:id',getCustomersIdValidation,getCustomersId);
router.post('/customers',postCustomersValidation,postCustomers);
router.put('/customers/:id',putCustomersValidation,putCustomers);

export default router;
