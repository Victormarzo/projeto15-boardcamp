import { getGames } from "../controllers/gamesController.js";
import { connection } from "../database/database.js";

async function getGamesValidation (req,res,next){
    const query=req.query.name
    res.locals.name = query;
    next()
};
export {getGamesValidation};