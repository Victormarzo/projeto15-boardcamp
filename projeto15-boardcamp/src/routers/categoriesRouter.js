import express from 'express';
import {getCategories,postCategories} from "../controllers/categoriesController.js"
import {categorieValidation} from "../middlewares/categoriesMiddleware.js"

const router=express.Router();

router.get('/categories',getCategories);
router.post('/categories',categorieValidation,postCategories)



export default router;