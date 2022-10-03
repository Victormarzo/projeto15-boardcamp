import { connection } from "../database/database.js";
import dayjs from 'dayjs';
async function getRentals (req,res){
    const gameId=res.locals.gameId;
    const customerId=res.locals.customerId;
    let rentals;
    try {
        if(gameId&&customerId){
            rentals=(await connection.query(`
            SELECT rentals.*, 
            json_build_object('id', customers.id, 'name', customers.name) 
            AS customer, 
            json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
            AS game FROM rentals 
            JOIN customers ON 
            rentals."customerId" = customers.id 
            JOIN games ON 
            rentals."gameId" = games.id 
            JOIN categories ON 
            games."categoryId" = categories.id 
            WHERE rentals."customerId" = $1 
            AND rentals."gameId" = $2;`, [customerId, gameId])).rows;
            res.send(rentals);
            
            
        }else if (gameId && !customerId){
            rentals=(await connection.query(`
            SELECT rentals.*, 
            json_build_object('id', customers.id, 'name', customers.name) 
            AS customer, 
            json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
            AS game FROM rentals 
            JOIN customers ON 
            rentals."customerId" = customers.id 
            JOIN games ON 
            rentals."gameId" = games.id 
            JOIN categories ON 
            games."categoryId" = categories.id 
            WHERE rentals."gameId" = $1;`, [gameId])).rows;
            res.send(rentals);

        }else if (!gameId && customerId){
            rentals=(await connection.query(`
            SELECT rentals.*, 
            json_build_object('id', customers.id, 'name', customers.name) 
            AS customer, 
            json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
            AS game FROM rentals 
            JOIN customers ON 
            rentals."customerId" = customers.id 
            JOIN games ON 
            rentals."gameId" = games.id 
            JOIN categories ON 
            games."categoryId" = categories.id 
            WHERE rentals."customerId" = $1;`, [customerId])).rows;
            res.send(rentals);

        }else {
            rentals=(await connection.query(`SELECT rentals.*, 
            json_build_object('id', customers.id, 'name', customers.name) 
            AS customer, 
            json_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) 
            AS game FROM rentals 
            JOIN customers ON 
            rentals."customerId" = customers.id 
            JOIN games ON 
            rentals."gameId" = games.id 
            JOIN categories ON 
            games."categoryId" = categories.id`,)).rows;
            res.send(rentals);
            
        }
        
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function postRentals (req,res){
    const {customerId,gameId,daysRented}=res.locals.body;
    const price=res.locals.price;
    const rentDate=dayjs(Date()).format('YYYY-MM-DD');
    const returnDate=null;
    const delayFee=null;
    const originalPrice=daysRented*price;
    try {
        const rentals=await connection.query(`
            INSERT INTO rentals 
            ("customerId","gameId","daysRented","rentDate","returnDate","delayFee","originalPrice")
            VALUES ($1, $2, $3, $4, $5,$6,$7)   
    
    `,[customerId,gameId,daysRented,rentDate,returnDate,delayFee,originalPrice]);
    res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

async function putRentals(req,res){
    const returnDate=dayjs().format();
    const returns=dayjs(Date()).format('YYYY-MM-DD');
    let delayFee;
    const {rentDate,id,daysRented,originalPrice}=res.locals.rentals;
    const delay = parseInt((dayjs(returnDate).unix()-dayjs(rentDate).unix())/86400);
    const fee = originalPrice/daysRented;
    console.log(id)
    if(delay>daysRented){
        delayFee=(delay-daysRented)*fee;
    }else{
        delayFee=0;
    }
    try {
        await connection.query(`
            UPDATE rentals 
            SET "returnDate"= $1,
            "delayFee"= $2
            WHERE id = $3
            `,[returns,delayFee,id])
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    

}

async function deleteRentals(req,res){
    const {id}=res.locals.rentals;
    
    try {
        await connection.query(`
            DELETE FROM rentals
            WHERE id=$1     
        
        `,[id]);
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}


export {getRentals,postRentals,putRentals,deleteRentals}