import express from 'express';
import {getRentalsValidation,postRentalValidation,putRentalValidation} from "../middlewares/rentalsMiddleware.js" 
import {getRentals,postRentals,putRentals,deleteRentals} from "../controllers/rentalsController.js"

const router=express.Router();

router.get('/rentals',getRentalsValidation,getRentals)
router.post('/rentals',postRentalValidation,postRentals)
router.put('/rentals/:id/return',putRentalValidation,putRentals)
router.delete('/rentals/:id',putRentalValidation,deleteRentals)

export default router;