import express from 'express';
import { getGames } from '../controllers/gamesController.js';
import { getGamesValidation } from '../middlewares/gamesMiddleware.js';

const router=express.Router();

router.get('/games',getGamesValidation,getGames);
//router.post('/games',)



export default router;