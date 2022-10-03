import { connection } from "../database/database.js";
import {costumersSchema} from '../schemas/schema.js'

async function getCustomersValidation(req,res,next){
    const query=req.query.cpf
    res.locals.cpf = query;
    next()
}

async function getCustomersIdValidation(req,res,next){
    const params = req.params.id
    
    try {
        const ids = (await connection.query(`
            SELECT * FROM customers WHERE id = $1;`, [params])).rows;
        if (ids.length===0){
            return res.sendStatus(404);
        }
        res.locals.id = params;
        next()
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function postCustomersValidation (req,res,next){
    const customer = req.body;
    const validation=costumersSchema.validate(customer,{abortEarly:false});
    if (validation.error){
        const errors=validation.error.details.map(detail=>detail.message);
        res.status(422).send({ errors: errors });
        return;
    }
    try {
        const cpf = (await connection.query(`
            SELECT * FROM customers WHERE cpf =$1    
            `,[customer.cpf])).rows;
        if(cpf.length!==0){
            res.sendStatus(409);
        }
        res.locals.customer=customer;
        next();
        

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function putCustomersValidation (req,res,next){
    const customer = req.body;
    const params = req.params.id;
    
    const validation=costumersSchema.validate(customer,{abortEarly:false});
    if (validation.error){
        const errors=validation.error.details.map(detail=>detail.message);
        res.status(422).send({ errors: errors });
        return;
    }
    try {
        
        const cpf = (await connection.query(`
        SELECT * FROM customers WHERE cpf =$1 AND id <> $2;    
        `,[customer.cpf,params])).rows;
        if(cpf.length!==0){
            res.sendStatus(409);
        }
        res.locals.id = params;
        res.locals.customer=customer;
        next();

    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

export {getCustomersValidation,getCustomersIdValidation,postCustomersValidation,putCustomersValidation};