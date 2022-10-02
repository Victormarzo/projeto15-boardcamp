import express from 'express';
import router from './routers/index.js';

const app = express();
app.use(express.json());
app.use(router);

app.listen(4000, ()=>{
    console.log("Server is listening on port 4000")
});