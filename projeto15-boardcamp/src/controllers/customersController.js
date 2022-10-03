import { connection } from "../database/database.js";
async function getCustomers(req,res){
    try {
        const query=res.locals.cpf;
        console.log(query)
        if (query){
            const games= await connection.query(`
                SELECT * FROM customers WHERE cpf LIKE $1;`, [`${query}%`]);
            res.send(games.rows);
        }
        const games= await connection.query(`
            SELECT * FROM customers;`);
        res.send(games.rows); 
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
async function getCustomersId(req,res){
    const id=res.locals.id;
    try {
        const ids= await connection.query(`
            SELECT * FROM customers WHERE id = $1;`, [id]);
        res.send(ids.rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
async function postCustomers(req,res){
    const {name,phone,cpf,birthday}=res.locals.customer;
    
    try {
        await connection.query(`INSERT INTO customers 
        (name,phone,cpf,birthday) 
        VALUES ($1, $2, $3, $4);`,
        [name,phone,cpf,birthday]);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }

}
async function putCustomers (req,res){
    const {name,phone,cpf,birthday}=res.locals.customer;
    const id=res.locals.id;

    try {
        await connection.query(`
        UPDATE customers SET 
        name = $1,
        phone = $2,
        cpf = $3,
        birthday = $4 
        WHERE id=$5;
        
        `,
        [name,phone,cpf,birthday,id ])
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }


}

export {getCustomers,getCustomersId,postCustomers,putCustomers}