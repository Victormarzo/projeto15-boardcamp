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
export {getGames};