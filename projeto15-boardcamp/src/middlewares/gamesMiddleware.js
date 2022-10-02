import { connection } from "../database/database.js";

import {gamesSchema} from '../schemas/schema.js'
async function getGamesValidation (req,res,next){
    const query=req.query.name
    res.locals.name = query;
    next()
};
async function postGamesValidation(req,res,next){
    const game = req.body;
    const validation=gamesSchema.validate(game,{abortEarly:false,});
    if (validation.error){
        const errors = validation.error.details.map(error => error.message);
        res.status(400).send({ errors: errors });
    }
    
    try {
        const categories= (await connection.query('SELECT * FROM categories WHERE id = $1;',[game.categoryId])).rows[0];
        if(!categories){
            return res.sendStatus(400);
        } 
        const name=(await connection.query('SELECT * FROM games WHERE name = $1;',[game.name])).rows[0];
        if(name){
            return res.sendStatus(409);
        }
        res.locals.game = game;
        next(); 
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
    
    
    
    
    
    
    

}
export {getGamesValidation,postGamesValidation};