import express from 'express';
import { getGames,postGames } from '../controllers/gamesController.js';
import { getGamesValidation,postGamesValidation } from '../middlewares/gamesMiddleware.js';

const router=express.Router();

router.get('/games',getGamesValidation,getGames);
router.post('/games',postGamesValidation,postGames)



export default router;