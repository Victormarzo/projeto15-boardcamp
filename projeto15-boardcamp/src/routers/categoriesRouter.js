import express from 'express';
import {getCategories,postCategories} from "../controllers/categoriesController.js"
import {categoriesValidation} from "../middlewares/categoriesMiddleware.js"

const router=express.Router();

router.get('/categories',getCategories);
router.post('/categories',categoriesValidation,postCategories)



export default router;