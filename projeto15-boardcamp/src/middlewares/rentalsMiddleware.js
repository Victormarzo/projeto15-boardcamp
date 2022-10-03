import { connection } from "../database/database.js";
import {rentalsSchema} from "../schemas/schema.js";

async function getRentalsValidation (req,res,next){
    const customerId=req.query.customerId
    const gameId=req.query.gameId
    try {
        if (gameId){
            const name=(await connection.query('SELECT * FROM games WHERE id = $1;',[gameId])).rows[0];
            if(!name){
                return res.sendStatus(404);
            }
        }
        if(customerId){
            const ids = (await connection.query(`
                SELECT * FROM customers WHERE id = $1;`, [customerId])).rows;
            if (ids.length===0){
                return res.sendStatus(404);
            }
        }
        res.locals.customerId = customerId;
        res.locals.gameId = gameId;
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    next()
};

async function postRentalValidation (req,res,next){
    const body=req.body
    const validation=rentalsSchema.validate(body,{abortEarly:false,});
    if (validation.error){
        const errors = validation.error.details.map(error => error.message);
        res.status(400).send({ errors: errors });
    }
    try {
        const ids = (await connection.query(`
            SELECT * FROM customers WHERE id = $1;`, [body.customerId])).rows;
        if (ids.length===0){
            return res.sendStatus(400);
        }
        const name=(await connection.query('SELECT * FROM games WHERE id = $1;',[body.gameId])).rows[0];
        let stockTotal;
        let pricePerDay;
        if(!name){
            return res.sendStatus(400);
        }else{
            stockTotal= name.stockTotal;
            pricePerDay=name.pricePerDay;
            res.locals.price=pricePerDay;
        }
        const stock=(await connection.query(`SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`,[body.gameId])).rows;
        if (stock.length>=stockTotal){
            return res.sendStatus(400);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    
    res.locals.body=body;
    
    next();
}

async function putRentalValidation(req,res,next){
    const id = req.params.id;
    let returnDate;

    try {
        const rentals=(await connection.query(`
            SELECT * FROM rentals WHERE id= $1;
       `,[id])).rows[0];
       if(!rentals){
            res.sendStatus(404);
       }else{
       returnDate=rentals.returnDate;
       
       if(returnDate){
            res.sendStatus(400);
       }}
       res.locals.rentals=rentals;
       next();
       
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    

}

export{getRentalsValidation,postRentalValidation,putRentalValidation};