import { connection } from "../database/database.js";
async function getGames(req,res){
    try {
        const query=res.locals.name;
        if (query){
            const games= await connection.query(`
                SELECT games.*,categories.name AS "categoryName" 
                FROM games JOIN categories ON games."categoryId"=categories.id 
                WHERE games.name ILIKE $1;`, [`${query}%`]);
            res.send(games.rows);
        }
        const games= await connection.query(`
            SELECT games.*,categories.name AS "categoryName" 
            FROM games JOIN categories ON games."categoryId"=categories.id;`);
        res.send(games.rows); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

async function postGames(req,res){
    const { name, image, stockTotal, categoryId, pricePerDay }=res.locals.game;
    try {
        await connection.query('INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5);',
        [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


export {getGames,postGames};