import { connection } from "../database/database.js";
import { categoriesSchema } from "../schemas/schema.js";

async function categorieValidation (req,res,next){
    const {name}=req.body;
    if(!name){
        return res.sendStatus(400);
    }
    const validation=categoriesSchema.validate({name},{abortEarly:false,});
    if (validation.error){
        const errors=validation.error.details.map((detail)=>detail.message);
        res.sendStatus(422).send(errors);
        return;
    }
    try {
        const categories= (await connection.query('SELECT * FROM categories WHERE name = $1;',[name])).rows[0];
        if(categories){
            return res.sendStatus(409);
        } 
        res.locals.name = name;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}
export {categorieValidation};