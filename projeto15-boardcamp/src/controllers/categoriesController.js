import { query } from "express";
import { connection } from "../database/database.js";
async function getCategories(req,res){
    
    try {
        const categories= await connection.query('SELECT * FROM categories;');
        res.send(categories.rows); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
async function postCategories(req,res){
    const {name}=res.locals;
    try {
        await connection.query('INSERT INTO categories (name) VALUES ($1);',[name]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export {getCategories,postCategories};